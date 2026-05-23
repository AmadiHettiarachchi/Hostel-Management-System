import { Link } from "react-router-dom";
import { ArrowLeft, User, Phone, IdCard, CalendarDays } from "lucide-react";

function VisitorBooking() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F] flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#7A6252] hover:text-[#3B2F2F] mb-6"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        <h1 className="text-3xl font-black mb-2" style={{ color: "#800080" }}>
          Visitor Appointment
        </h1>
        <p className="text-[#7A6252] mb-8">
          Fill this form to request a student visit.
        </p>

        <form className="space-y-4">
          <Input icon={User} placeholder="Visitor Name" />
          <Input icon={Phone} placeholder="Telephone Number" />
          <Input icon={IdCard} placeholder="NIC Number" />
          <Input icon={User} placeholder="Student Name" />
          <Input icon={CalendarDays} type="datetime-local" />

          <button
            type="button"
            className="w-full bg-[#800080] hover:bg-[#6A006A] text-white py-4 rounded-xl font-bold"
          >
            Submit Appointment Request
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ icon: Icon, placeholder, type = "text" }) {
  return (
    <div className="flex items-center gap-3 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3">
      <Icon size={18} className="text-[#7A6252]" />
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

export default VisitorBooking;