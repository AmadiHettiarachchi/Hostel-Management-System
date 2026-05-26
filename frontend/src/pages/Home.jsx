import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BedDouble, LogIn, Users } from "lucide-react";
import bg from "../assets/background.jpg";

function Home() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rooms");
      const data = await res.json();

      if (Array.isArray(data)) {
        setRooms(data);
      }
    } catch (error) {
      console.log("Fetch rooms error:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div
      className="w-full min-h-screen m-0 p-0 text-[#3B2F2F]"
      style={{
        backgroundImage: `linear-gradient(rgba(246,239,230,0.84), rgba(246,239,230,0.84)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="w-full min-h-[70vh] flex items-center justify-center p-0">
        <div className="w-[90%] max-w-3xl text-center bg-[#FFF7ED]/90 border border-[#E7CDB5] rounded-[2rem] p-10 shadow-xl">
          <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-[#800080] flex items-center justify-center shadow-lg">
            <BedDouble size={42} className="text-white" />
          </div>

          <h1
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ color: "#800080" }}
          >
            HostelHub
          </h1>

          <p className="text-[#800080] text-lg mb-10">
            Smart Hostel Management System
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 bg-[#800080] hover:bg-[#6A006A] text-white px-8 py-4 rounded-xl font-bold transition"
            >
              <LogIn size={20} />
              Login
            </Link>

            <Link
              to="/visitor-booking"
              className="flex items-center justify-center gap-3 bg-[#800080] border border-[#6B46C1] hover:bg-[#6A006A] text-white px-8 py-4 rounded-xl font-bold transition"
            >
              <Users size={20} />
              Visitor Appointment
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full px-0 pb-20">
        <div className="w-full text-center mb-10 bg-[#FFF7ED]/90 border-y border-[#E7CDB5] p-8 shadow-sm">
          <h2
            className="text-4xl font-black mb-3"
            style={{ color: "#800080" }}
          >
            Room Gallery
          </h2>

          <p className="text-[#7A6252]">
            View available and occupied rooms before booking.
          </p>
        </div>

        <div className="w-full px-6">
          {rooms.length === 0 ? (
            <div className="bg-[#FFF7ED]/90 border border-[#E7CDB5] rounded-[2rem] p-10 text-center">
              <p className="text-[#7A6252]">
                No rooms added yet. Rooms added by warden will appear here.
              </p>
            </div>
          ) : (
            <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-[#FFF7ED]/95 border border-[#E7CDB5] rounded-[2rem] overflow-hidden shadow-sm"
                >
                  <div className="h-48 bg-[#F3E2D0] flex items-center justify-center">
                    {room.imageUrl ? (
                      <img
                        src={room.imageUrl}
                        alt={`Room ${room.roomNumber}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BedDouble className="text-[#800080]" size={60} />
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-black mb-2">
                      Room {room.roomNumber}
                    </h3>

                    <p className="text-[#7A6252] text-sm">
                      Floor: {room.floor}
                    </p>

                    <p className="text-[#7A6252] text-sm">
                      Type: {room.type}
                    </p>

                    <p className="text-[#7A6252] text-sm">
                      Capacity: {room.allocatedStudents?.length || 0}/
                      {room.capacity}
                    </p>

                    <span
                      className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold ${
                        room.status === "Full"
                          ? "bg-red-100 text-red-700"
                          : room.status === "Occupied"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {room.status === "Full" ? "Not Available" : room.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;