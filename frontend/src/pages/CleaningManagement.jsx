import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, CalendarDays, ClipboardCheck } from "lucide-react";

function CleaningManagement() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Cleaning Management</h1>
          <p className="text-sm text-[#7A6252]">
            Manage student bathroom cleaning schedules
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
        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Create Cleaning Duty</h2>
            </div>

            <form className="space-y-4">
              <Input label="Room Number" placeholder="Example: 101" />
              <Input label="Floor" placeholder="Example: 1st Floor" />
              <Input label="Cleaning Area" placeholder="Example: Bathroom 1" />
              <Input label="Assigned Date" type="date" />
              <Input label="Assigned Students" placeholder="Student names or room students" />

              <button
                type="button"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Create Schedule
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Weekly Timetable</h2>
            </div>

            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <ClipboardCheck className="mx-auto text-[#800080] mb-4" size={45} />
              <p className="text-[#7A6252]">
                No cleaning schedules loaded yet. Schedules will appear here
                after connecting backend.
              </p>
            </div>
          </div>
        </section>
      </main>
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

export default CleaningManagement;