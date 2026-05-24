import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  QrCode,
  AlertTriangle,
  LogIn,
  LogOut
} from "lucide-react";

function CheckRecords() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Check-in / Check-out Records</h1>
          <p className="text-sm text-[#7A6252]">
            Monitor student hostel entry and exit times
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
        <section className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card title="Today Check-ins" icon={LogIn} />
          <Card title="Today Check-outs" icon={LogOut} />
          <Card title="Late Check-ins" icon={AlertTriangle} />
          <Card title="Active QR Status" icon={QrCode} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Student Check Records</h2>
          </div>

          <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
            <p className="text-[#7A6252]">
              No check-in or check-out records loaded yet. Records will appear
              here after connecting backend QR check-in feature.
            </p>
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

export default CheckRecords;