import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BedDouble, UserPlus, Search } from "lucide-react";

function RoomAllocation() {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    roomNumber: "",
    floor: "",
    capacity: "",
    type: "",
  });

  const [allocation, setAllocation] = useState({
    roomId: "",
    studentId: "",
  });

  const API_URL = "http://localhost:5000/api/rooms";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAllocationChange = (e) => {
    setAllocation({
      ...allocation,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (!Array.isArray(data)) {
        setRooms([]);
        return;
      }

      setRooms(data);
    } catch (error) {
      console.log("Fetch rooms error:", error);
    }
  };

  const fetchUnallocatedStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/unallocated-students`);
      const data = await res.json();

      if (!Array.isArray(data)) {
        setStudents([]);
        return;
      }

      setStudents(data);
    } catch (error) {
      console.log("Fetch students error:", error);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const roomCapacity = Number(form.capacity);

    if (roomCapacity < 1 || roomCapacity > 3) {
      alert("Room capacity must be between 1 and 3");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          capacity: roomCapacity,
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
      });

      fetchRooms();
    } catch (error) {
      console.log("Add room error:", error);
      alert("Server error");
    }
  };

  const handleAllocate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/allocate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allocation),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Allocation failed");
        return;
      }

      alert("Student allocated successfully");

      setAllocation({
        roomId: "",
        studentId: "",
      });

      fetchRooms();
      fetchUnallocatedStudents();
    } catch (error) {
      console.log("Allocation error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchUnallocatedStudents();
  }, []);

  const availableRooms = rooms.filter((room) => room.status !== "Full");

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#800080" }}>
            Room Allocation
          </h1>
          <p className="text-sm text-[#7A6252]">
            Add rooms and allocate unassigned students to available rooms
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
                placeholder="Maximum 3 students"
                type="number"
                min="1"
                max="3"
              />

              <Input
                label="Room Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="Example: A/C, Non A/C"
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

            <form onSubmit={handleAllocate} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Select Student
                </label>

                <select
                  name="studentId"
                  value={allocation.studentId}
                  onChange={handleAllocationChange}
                  required
                  className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]"
                >
                  <option value="">Choose unallocated student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.fullName} - {student.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Select Available Room
                </label>

                <select
                  name="roomId"
                  value={allocation.roomId}
                  onChange={handleAllocationChange}
                  required
                  className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]"
                >
                  <option value="">Choose available room</option>
                  {availableRooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      Room {room.roomNumber} - {room.type} - {room.status}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Allocate Student
              </button>
            </form>
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

                  <p className="text-[#7A6252] text-sm">
                    Floor: {room.floor}
                  </p>

                  <p className="text-[#7A6252] text-sm">
                    Capacity: {room.capacity}
                  </p>

                  <p className="text-[#7A6252] text-sm">
                    Type: {room.type}
                  </p>

                  <p className="text-[#7A6252] text-sm mt-3 font-bold">
                    Allocated Students:
                  </p>

                  {room.allocatedStudents?.length > 0 ? (
                    <ul className="text-sm text-[#7A6252] list-disc ml-5">
                      {room.allocatedStudents.map((student) => (
                        <li key={student._id}>{student.fullName}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[#7A6252]">No students</p>
                  )}

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

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        min={min}
        max={max}
        placeholder={placeholder}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

export default RoomAllocation;