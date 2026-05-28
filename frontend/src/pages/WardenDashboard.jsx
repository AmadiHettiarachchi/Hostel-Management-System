import { Link } from "react-router-dom";
import { QrCode } from "lucide-react";
import {
  BedDouble,
  Sparkles,
  CreditCard,
  Users,
  MessageSquare,
  Clock,
  LogOut
} from "lucide-react";

function WardenDashboard() {
  const modules = [
    { title: "Room Allocation", icon: BedDouble, path: "/room-allocation" },
    { title: "Cleaning Management", icon: Sparkles, path: "/cleaning-management" },
    { title: "Payment Management", icon: CreditCard, path: "/payment-management" },
    { title: "Visitor Management", icon: Users, path: "/visitor-management" },
    { title: "Feedback / Complaints", icon: MessageSquare, path: "/complaints" },
    { title: "Check-in / Check-out Records", icon: Clock, path: "/check-records" },
    { title: "QR Scanner", icon: QrCode, path: "/qr-scanner" },
  ];

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#800080" }}>
            Warden Dashboard
          </h1>
          <p className="text-sm text-[#7A6252]">
            Manage hostel operations
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 bg-[#800080] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#6A006A]"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 mb-8 shadow-sm">
          <h2 className="text-4xl font-black mb-3">
            Hostel Management Panel
          </h2>
          <p className="text-[#7A6252]">
            Manage rooms, cleaning schedules, visitors, payments, feedback and
            student check-in records.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.path}
                className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 hover:bg-[#F3E2D0] transition shadow-sm"
              >
                <div className="w-14 h-14 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl flex items-center justify-center mb-5">
                  <Icon size={28} className="text-[#800080]" />
                </div>

                <h3 className="text-xl font-black">{item.title}</h3>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default WardenDashboard;