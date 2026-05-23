import { Link } from "react-router-dom";
import { BedDouble, LogIn, Users } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F] flex items-center justify-center px-6">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-[#800080] flex items-center justify-center shadow-lg">
          <BedDouble size={42} className="text-white" />
        </div>

        <h1
          className="text-5xl md:text-7xl font-black mb-4"
          style={{ color: "#800080" }}
        >
          HostelHub
        </h1>

        <p className="text-[#800080] text-lg mb-10">
          Smart Hostel Management System
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="flex items-center justify-center gap-3 bg-[#800080] hover:bg-[#6A006A] text-white px-8 py-4 rounded-xl font-bold transition"
          >
            <LogIn size={20} />
            Login
          </Link>

          <Link
            to="/visitor-booking"
            className="flex items-center justify-center gap-3 bg-[#800080] border border-[#6B46C1] hover:bg-[#6A006A] text-white px-8 py-4 rounded-xl font-bold transition"
          >
            <Users size={20} />
            Visitor Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;