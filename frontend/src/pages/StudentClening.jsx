import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, CalendarDays, ClipboardCheck } from "lucide-react";

function StudentCleaning() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Cleaning Schedule</h1>
            <p className="text-[#7A6252]">
              View your assigned bathroom cleaning duties
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
          <Card title="Today’s Duty" icon={Sparkles} />
          <Card title="This Week" icon={CalendarDays} />
          <Card title="Completed Tasks" icon={ClipboardCheck} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">My Cleaning Timetable</h2>
          </div>

          <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
            <p className="text-[#7A6252]">
              No cleaning schedule loaded yet. Your assigned cleaning duties
              will appear here after backend connection.
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

export default StudentCleaning;