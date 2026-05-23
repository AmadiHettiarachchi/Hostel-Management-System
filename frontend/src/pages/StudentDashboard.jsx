import { Link } from "react-router-dom";
import {
  User,
  QrCode,
  Sparkles,
  CreditCard,
  MessageSquare,
  Star,
  LogOut
} from "lucide-react";

function StudentDashboard() {
  const menu = [
    { title: "My Profile", icon: User, path: "/student-profile" },
    { title: "My QR", icon: QrCode, path: "/student-qr" },
    { title: "Cleaning Schedule", icon: Sparkles, path: "/student-cleaning" },
    { title: "Payments", icon: CreditCard, path: "/student-payments" },
    { title: "Feedback", icon: MessageSquare, path: "/student-feedback" },
    { title: "Ratings", icon: Star, path: "/student-ratings" }
  ];

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Student Dashboard</h1>
          <p className="text-sm text-[#7A6252]">
            Manage your hostel account
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
            Welcome to your hostel portal
          </h2>
          <p className="text-[#7A6252]">
            View your profile, QR, cleaning schedule, payments and feedback.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {menu.map((item) => {
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

export default StudentDashboard;