import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";

function PaymentManagement() {
  const [payments, setPayments] = useState([]);

  const API_URL = "http://localhost:5000/api/payments";

  const fetchPayments = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPayments(data);
      }
    } catch (error) {
      console.log("Fetch payments error:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment status update failed");
        return;
      }

      alert(`Payment ${status}`);
      fetchPayments();
    } catch (error) {
      console.log("Payment status error:", error);
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
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Payment Management
          </h1>
          <p className="text-sm text-[#7A6252]">
            Review student hostel payments and approve or reject submissions
          </p>
        </div>

        <Link
          to="/warden-dashboard"
          className="flex items-center gap-2 bg-[#800080] text-white px-4 py-3 rounded-xl font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card title="Approved Payments" value={approvedCount} icon={CheckCircle} />
          <Card title="Pending Payments" value={pendingCount} icon={Clock} />
          <Card title="Rejected Payments" value={rejectedCount} icon={AlertCircle} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Student Payment Records</h2>
          </div>

          {payments.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                No payment records submitted yet.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-5">
              {payments.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1">
                      <h3 className="text-xl font-black">
                        {payment.studentName}
                      </h3>

                      <p className="text-sm text-[#7A6252]">
                        Email: {payment.studentEmail}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        Month: {payment.month}
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

                    <div className="w-full md:w-52">
                      {payment.paymentSlip ? (
                        <img
                          src={`http://localhost:5000${payment.paymentSlip}`}
                          alt="Payment Slip"
                          className="w-full h-40 object-cover rounded-xl border border-[#E7CDB5]"
                        />
                      ) : (
                        <div className="w-full h-40 bg-[#FFF7ED] border border-dashed border-[#E7CDB5] rounded-xl flex items-center justify-center text-[#7A6252] text-sm">
                          No slip
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => updateStatus(payment._id, "Approved")}
                      className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(payment._id, "Rejected")}
                      className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-700"
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default PaymentManagement;