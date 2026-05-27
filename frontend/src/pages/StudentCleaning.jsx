import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, CalendarDays } from "lucide-react";

function StudentCleaning() {
  const [schedules, setSchedules] = useState([]);
  const [studentRoom, setStudentRoom] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyCleaningSchedules = async () => {
    try {
      const roomsRes = await fetch("http://localhost:5000/api/rooms");
      const roomsData = await roomsRes.json();

      if (!Array.isArray(roomsData)) {
        setSchedules([]);
        return;
      }

      const myRoom = roomsData.find((room) =>
        room.allocatedStudents?.some((student) => student._id === user?.id)
      );

      setStudentRoom(myRoom || null);

      if (!myRoom) {
        setSchedules([]);
        return;
      }

      const cleaningRes = await fetch("http://localhost:5000/api/cleaning");
      const cleaningData = await cleaningRes.json();

      if (!Array.isArray(cleaningData)) {
        setSchedules([]);
        return;
      }

      const mySchedules = cleaningData.filter(
        (schedule) => schedule.roomNumber === myRoom.roomNumber
      );

      setSchedules(mySchedules);
    } catch (error) {
      console.log("Fetch student cleaning schedules error:", error);
    }
  };

  useEffect(() => {
    fetchMyCleaningSchedules();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Cleaning Schedule
          </h1>
          <p className="text-[#7A6252]">
            View cleaning duties assigned to your room only
          </p>
        </div>

        <Link
          to="/student-dashboard"
          className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2 font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#800080]" size={30} />
            <div>
              <h2 className="text-2xl font-black">My Cleaning Timetable</h2>
              <p className="text-sm text-[#7A6252]">
                {studentRoom
                  ? `Your room: ${studentRoom.roomNumber}`
                  : "No room allocated yet"}
              </p>
            </div>
          </div>

          {!studentRoom ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <CalendarDays className="mx-auto text-[#800080] mb-4" size={45} />
              <p className="text-[#7A6252]">
                You are not allocated to a room yet. Cleaning schedules will
                appear after room allocation.
              </p>
            </div>
          ) : schedules.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <CalendarDays className="mx-auto text-[#800080] mb-4" size={45} />
              <p className="text-[#7A6252]">
                No cleaning schedules assigned for your room yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {schedules.map((schedule) => (
                <div
                  key={schedule._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-6"
                >
                  <h3 className="text-xl font-black">
                    Room {schedule.roomNumber}
                  </h3>

                  <p className="text-sm text-[#7A6252] mt-2">
                    Floor: {schedule.floor}
                  </p>

                  <p className="text-sm text-[#7A6252]">
                    Cleaning Area: {schedule.cleaningArea}
                  </p>

                  <p className="text-sm text-[#7A6252]">
                    Date: {schedule.assignedDate}
                  </p>

                  <span
                    className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold ${
                      schedule.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {schedule.status}
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

export default StudentCleaning;