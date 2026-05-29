import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Clock,
  CheckCircle,
  Upload,
  XCircle,
} from "lucide-react";

function StudentPayments() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    amount: "",
    month: "",
    paymentMethod: "",
    referenceNumber: "",
    paymentSlip: null,
  });

  const API_URL = "http://localhost:5000/api/payments";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        const myPayments = data.filter(
          (payment) => payment.studentId === user?.id
        );

        setPayments(myPayments);
      }
    } catch (error) {
      console.log("Fetch student payments error:", error);
    }
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const paymentData = new FormData();

      paymentData.append("studentId", user.id);
      paymentData.append("studentName", user.fullName);
      paymentData.append("studentEmail", user.email);
      paymentData.append("amount", form.amount);
      paymentData.append("month", form.month);
      paymentData.append("paymentMethod", form.paymentMethod);
      paymentData.append("referenceNumber", form.referenceNumber);

      if (form.paymentSlip) {
        paymentData.append("paymentSlip", form.paymentSlip);
      }

      const res = await fetch(API_URL, {
        method: "POST",
        body: paymentData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment submission failed");
        return;
      }

      alert("Payment submitted successfully");

      setForm({
        amount: "",
        month: "",
        paymentMethod: "",
        referenceNumber: "",
        paymentSlip: null,
      });

      fetchPayments();
    } catch (error) {
      console.log("Submit payment error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const approvedCount = payments.filter((p) => p.status === "Approved").length;
  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const rejectedCount = payments.filter((p) => p.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#800080]">
              My Payments
            </h1>
            <p className="text-[#7A6252]">
              Submit hostel fee details and upload payment slip
            </p>
          </div>

          <Link
            to="/student-dashboard"
            className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2 font-bold"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <Card title="Approved" value={approvedCount} icon={CheckCircle} />
          <Card title="Pending" value={pendingCount} icon={Clock} />
          <Card title="Rejected" value={rejectedCount} icon={XCircle} />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Submit Payment</h2>
            </div>

            <div className="mb-5 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl p-4">
              <p className="text-sm text-[#7A6252]">Paying Student</p>
              <p className="font-black">{user?.fullName}</p>
              <p className="text-sm text-[#7A6252]">{user?.email}</p>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <Input
                label="Payment Month"
                name="month"
                type="month"
                value={form.month}
                onChange={handleChange}
              />

              <Input
                label="Amount"
                name="amount"
                placeholder="Enter amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
              />

              <Select
                label="Payment Method"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Select payment method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash Deposit">Cash Deposit</option>
                <option value="Online Payment">Online Payment</option>
              </Select>

              <Input
                label="Reference Number"
                name="referenceNumber"
                placeholder="Enter transaction/reference number"
                value={form.referenceNumber}
                onChange={handleChange}
              />

              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Payment Slip Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    setForm({
                      ...form,
                      paymentSlip: e.target.files[0],
                    })
                  }
                  className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Submit Payment
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">My Payment Records</h2>
            </div>

            {payments.length === 0 ? (
              <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
                <p className="text-[#7A6252]">No payment records yet.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {payments.map((payment) => (
                  <div
                    key={payment._id}
                    className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                  >
                    <h3 className="text-xl font-black">{payment.month}</h3>

                    <p className="text-sm text-[#7A6252]">
                      Student: {payment.studentName}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Amount: Rs. {payment.amount}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Method: {payment.paymentMethod}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Reference: {payment.referenceNumber}
                    </p>

                    {payment.paymentSlip && (
                      <img
                        src={`http://localhost:5000${payment.paymentSlip}`}
                        alt="Payment Slip"
                        className="mt-4 w-full h-44 object-cover rounded-xl border border-[#E7CDB5]"
                      />
                    )}

                    <span
                      className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold ${
                        payment.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 shadow-sm">
      <Icon className="text-[#800080] mb-4" size={32} />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="text-4xl font-black text-[#800080] mt-2">{value}</p>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, children }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]"
      >
        {children}
      </select>
    </div>
  );
}

export default StudentPayments;