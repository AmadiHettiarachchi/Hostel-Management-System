import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071A2F]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-black text-white">HostelHub</h1>
          <p className="text-xs text-slate-400">Smart Hostel Management</p>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-300">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/rooms" className="hover:text-white">Rooms</Link>
          <Link to="/login" className="hover:text-white">Login</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        </div>

        <Link
          to="/rooms"
          className="bg-white text-[#071A2F] px-5 py-3 rounded-2xl text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2"
        >
          Explore Rooms
          <ArrowRight size={17} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;