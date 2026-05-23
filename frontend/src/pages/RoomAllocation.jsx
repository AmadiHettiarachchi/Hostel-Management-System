import { Link } from "react-router-dom";
import { ArrowLeft, BedDouble, UserPlus, Search } from "lucide-react";

function RoomAllocation() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#800080" }}>
            Room Allocation
          </h1>
          <p className="text-sm text-[#7A6252]">
            Allocate available rooms to registered students
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
          {/* Add Room */}
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BedDouble className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Add Room</h2>
            </div>

            <form className="space-y-4">
              <Input label="Room Number" placeholder="Example: 105" />
              <Input label="Floor" placeholder="Example: 1st Floor" />
              <Input label="Capacity" placeholder="Example: 2" type="number" />
              <Input label="Room Type" placeholder="Example: Double Room" />
              <Input label="Facilities" placeholder="Wi-Fi, Bathroom, Study Table" />

              <button
                type="button"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Add Room
              </button>
            </form>
          </div>

          {/* Allocate Room */}
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <UserPlus className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Allocate Room</h2>
            </div>

            <form className="space-y-4">
              <Input label="Student Email / ID" placeholder="Search student" />
              <Input label="Room Number" placeholder="Enter available room number" />

              <button
                type="button"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Allocate Room
              </button>
            </form>
          </div>
        </section>

        {/* Empty State */}
        <section className="mt-8 bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <Search className="text-[#800080]" />
            <h2 className="text-2xl font-black">Room Records</h2>
          </div>

          <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
            <p className="text-[#7A6252]">
              No room records loaded yet. Room data will appear here after
              connecting backend.
            </p>
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

export default RoomAllocation;