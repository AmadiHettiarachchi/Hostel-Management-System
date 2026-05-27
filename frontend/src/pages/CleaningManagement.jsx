import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  CalendarDays,
  ClipboardCheck,
  Trash2,
  CheckCircle,
} from "lucide-react";

function CleaningManagement() {
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [form, setForm] = useState({
    roomNumber: "",
    floor: "",
    cleaningArea: "",
    assignedDate: "",
    assignedStudents: "",
  });

  const CLEANING_API = "http://localhost:5000/api/cleaning";
  const ROOM_API = "http://localhost:5000/api/rooms";

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roomNumber") {
      const room = rooms.find((item) => item.roomNumber === value);

      const studentNames =
        room?.allocatedStudents?.map((student) => student.fullName).join(", ") ||
        "";

      setForm({
        ...form,
        roomNumber: value,
        floor: room?.floor || "",
        assignedStudents: studentNames,
      });

      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const fetchSchedules = async () => {
    const res = await fetch(CLEANING_API);
    const data = await res.json();

    if (Array.isArray(data)) {
      setSchedules(data);
    }
  };

  const fetchRooms = async () => {
    const res = await fetch(ROOM_API);
    const data = await res.json();

    if (Array.isArray(data)) {
      setRooms(data);
    }
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch(CLEANING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Schedule creation failed");
        return;
      }

      alert("Cleaning schedule created successfully");

      setForm({
        roomNumber: "",
        floor: "",
        cleaningArea: "",
        assignedDate: "",
        assignedStudents: "",
      });

      fetchSchedules();
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const updateStatus = async (id) => {
    await fetch(`${CLEANING_API}/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Completed" }),
    });

    fetchSchedules();
  };

  const deleteSchedule = async (id) => {
    const confirmDelete = window.confirm("Delete this schedule?");
    if (!confirmDelete) return;

    await fetch(`${CLEANING_API}/${id}`, {
      method: "DELETE",
    });

    fetchSchedules();
  };

  useEffect(() => {
    fetchSchedules();
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Cleaning Management
          </h1>
          <p className="text-sm text-[#7A6252]">
            Assign hostel cleaning areas to room students
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

            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <Select
                label="Room Number"
                name="roomNumber"
                value={form.roomNumber}
                onChange={handleChange}
              >
                <option value="">Select room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room.roomNumber}>
                    Room {room.roomNumber}
                  </option>
                ))}
              </Select>

              <Input
                label="Floor"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                placeholder="Auto filled after selecting room"
                readOnly
              />

              <Select
                label="Cleaning Area"
                name="cleaningArea"
                value={form.cleaningArea}
                onChange={handleChange}
              >
                <option value="">Select cleaning area</option>
                <option value="Common Bathroom 1">Common Bathroom 1</option>
                <option value="Common Bathroom 2">Common Bathroom 2</option>
                <option value="Study Area">Study Area</option>
                <option value="Living Area">Living Area</option>
                <option value="Dining Area">Dining Area</option>
                <option value="Balcony">Balcony</option>
                <option value="Corridor">Corridor</option>
                <option value="Staircase">Staircase</option>
              </Select>

              <Input
                label="Assigned Date"
                name="assignedDate"
                type="date"
                min={today}
                value={form.assignedDate}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Create Schedule
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CalendarDays className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Cleaning Timetable</h2>
            </div>

            {schedules.length === 0 ? (
              <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
                <ClipboardCheck
                  className="mx-auto text-[#800080] mb-4"
                  size={45}
                />
                <p className="text-[#7A6252]">
                  No cleaning schedules created yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {schedules.map((schedule) => (
                  <div
                    key={schedule._id}
                    className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                  >
                    <h3 className="text-xl font-black">
                      Room {schedule.roomNumber}
                    </h3>

                    <p className="text-sm text-[#7A6252]">
                      Floor: {schedule.floor}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Area: {schedule.cleaningArea}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Date: {schedule.assignedDate}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Students: {schedule.assignedStudents}
                    </p>

                    <span
                      className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                        schedule.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {schedule.status}
                    </span>

                    <div className="flex gap-3 mt-4">
                      {schedule.status === "Pending" && (
                        <button
                          onClick={() => updateStatus(schedule._id)}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
                        >
                          <CheckCircle size={16} />
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => deleteSchedule(schedule._id)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
  readOnly = false,
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
        readOnly={readOnly}
        placeholder={placeholder}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, children }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]"
      >
        {children}
      </select>
    </div>
  );
}

export default CleaningManagement;