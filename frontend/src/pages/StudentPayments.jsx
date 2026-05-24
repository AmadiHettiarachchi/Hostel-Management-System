import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";

function StudentPayments() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">My Payments</h1>
          <p className="text-[#7A6252]">View your payment status and history</p>
        </div>

        <Link
          to="/student-dashboard"
          className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2 font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Payment Records</h2>
          </div>

          <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
            <p className="text-[#7A6252]">
              No payment records loaded yet.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentPayments;