import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Clock, CheckCircle, Upload } from "lucide-react";

function StudentPayments() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">My Payments</h1>
            <p className="text-[#7A6252]">
              View hostel fee status and upload payment slips
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
          <Card title="Paid Payments" icon={CheckCircle} />
          <Card title="Pending Payments" icon={Clock} />
          <Card title="Payment History" icon={CreditCard} />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Upload Payment Slip</h2>
            </div>

            <form className="space-y-4">
              <Input label="Payment Month" type="month" />
              <Input label="Amount" placeholder="Enter paid amount" type="number" />
              <Input label="Payment Slip" type="file" />

              <button
                type="button"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Submit Payment
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Payment Records</h2>
            </div>

            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                No payment records loaded yet. Your payment history will appear
                here after backend connection.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ title, icon: Icon }) {
  return (
    <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 shadow-sm">
      <Icon className="text-[#800080] mb-4" size={32} />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="text-[#7A6252] text-sm mt-2">No data loaded</p>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

export default StudentPayments;