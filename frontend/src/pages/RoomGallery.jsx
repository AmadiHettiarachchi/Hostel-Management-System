import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BedDouble, Users } from "lucide-react";

function RoomGallery() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rooms");
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

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#800080" }}>
            Room Gallery
          </h1>
          <p className="text-sm text-[#7A6252]">
            View available and occupied hostel rooms
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 bg-[#800080] text-white px-4 py-3 rounded-xl font-bold"
        >
          <ArrowLeft size={18} />
          Home
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {rooms.length === 0 ? (
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-10 text-center">
            <p className="text-[#7A6252]">
              No rooms added yet. Rooms added by warden will appear here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-6 shadow-sm"
              >
                <div className="h-40 bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl flex items-center justify-center mb-5">
                  <BedDouble className="text-[#800080]" size={55} />
                </div>

                <h2 className="text-2xl font-black mb-2">
                  Room {room.roomNumber}
                </h2>

                <p className="text-[#7A6252] text-sm">Floor: {room.floor}</p>
                <p className="text-[#7A6252] text-sm">Type: {room.type}</p>

                <p className="text-[#7A6252] text-sm flex items-center gap-2 mt-2">
                  <Users size={16} />
                  Capacity: {room.allocatedStudents?.length || 0}/{room.capacity}
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

                <button
                  disabled={room.status === "Full"}
                  className={`w-full mt-5 py-3 rounded-xl font-bold ${
                    room.status === "Full"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#800080] text-white hover:bg-[#6A006A]"
                  }`}
                >
                  {room.status === "Full" ? "Not Available" : "Book Room"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default RoomGallery;