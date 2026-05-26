import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BedDouble, UserPlus, Search } from "lucide-react";

function RoomAllocation() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    floor: "",
    capacity: "",
    type: "",
    facilities: "",
  });

  const API_URL = "http://localhost:5000/api/rooms";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.log("Rooms API did not return array:", data);
        setRooms([]);
        return;
}
      setRooms(data);
    } catch (error) {
      console.log("Fetch rooms error:", error);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Room creation failed");
        return;
      }

      alert("Room added successfully");

      setForm({
        roomNumber: "",
        floor: "",
        capacity: "",
        type: "",
        facilities: "",
      });

      fetchRooms();
    } catch (error) {
      console.log("Add room error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Room Allocation</h1>
          <p className="text-sm text-[#7A6252]">
            Add rooms and manage available hostel rooms
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
              <BedDouble className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Add Room</h2>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-4">
              <Input
                label="Room Number"
                name="roomNumber"
                value={form.roomNumber}
                onChange={handleChange}
                placeholder="Example: 105"
              />

              <Input
                label="Floor"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                placeholder="Example: 1st Floor"
              />

              <Input
                label="Capacity"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Example: 2"
                type="number"
              />

              <Input
                label="Room Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Example: Double Room"
              />

              <Input
                label="Facilities"
                name="facilities"
                value={form.facilities}
                onChange={handleChange}
                placeholder="Wi-Fi, Bathroom, Study Table"
              />

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Add Room
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <UserPlus className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Allocate Room</h2>
            </div>

            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                Allocation feature will be connected after student data is ready.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <Search className="text-[#800080]" />
            <h2 className="text-2xl font-black">Room Records</h2>
          </div>

          {rooms.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">No rooms added yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                >
                  <h3 className="text-xl font-black">
                    Room {room.roomNumber}
                  </h3>
                  <p className="text-[#7A6252] text-sm">Floor: {room.floor}</p>
                  <p className="text-[#7A6252] text-sm">
                    Capacity: {room.capacity}
                  </p>
                  <p className="text-[#7A6252] text-sm">Type: {room.type}</p>
                  <p className="text-[#7A6252] text-sm">
                    Facilities: {room.facilities}
                  </p>

                  <span className="inline-block mt-4 bg-[#800080] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {room.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

export default RoomAllocation;