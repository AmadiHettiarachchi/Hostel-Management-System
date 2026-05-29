import { Link } from "react-router-dom";

import {
  BedDouble,
  Sparkles,
  Users,
  CreditCard,
  MessageSquare,
  Clock,
  QrCode,
  Star,
  LogOut,
} from "lucide-react";

function WardenDashboard() {
  const modules = [
    {
      title: "Room Allocation",
      description: "Add, edit, delete rooms and allocate students",
      icon: BedDouble,
      path: "/room-allocation",
    },
    {
      title: "Cleaning Management",
      description: "Create and manage cleaning schedules",
      icon: Sparkles,
      path: "/cleaning-management",
    },
    {
      title: "Visitor Management",
      description: "Accept, decline and track visitor requests",
      icon: Users,
      path: "/visitor-management",
    },
    {
      title: "Payment Management",
      description: "Approve or reject student payments",
      icon: CreditCard,
      path: "/payment-management",
    },
    {
      title: "Feedback / Complaints",
      description: "View and respond to student messages",
      icon: MessageSquare,
      path: "/complaints",
    },
    {
      title: "Check Records",
      description: "View student check-in and check-out records",
      icon: Clock,
      path: "/check-records",
    },
    {
      title: "QR Scanner",
      description: "Scan student QR for check-in or check-out",
      icon: QrCode,
      path: "/qr-scanner",
    },
    {
      title: "Ratings Management",
      description: "View student ratings and average satisfaction",
      icon: Star,
      path: "/ratings-management",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#800080]">
            Warden Dashboard
          </h1>
          <p className="text-[#7A6252]">
            Manage hostel operations from one place
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#800080] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#6A006A]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <Link
                key={module.title}
                to={module.path}
                className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#800080] flex items-center justify-center mb-5">
                  <Icon className="text-white" size={30} />
                </div>

                <h2 className="text-2xl font-black mb-2">
                  {module.title}
                </h2>

                <p className="text-[#7A6252]">
                  {module.description}
                </p>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default WardenDashboard;