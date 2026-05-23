import { BedDouble } from "lucide-react";

function RoomCard({ room }) {
  const badgeColor =
    room.status === "Available"
      ? "bg-white text-[#071A2F] border-white"
      : "bg-slate-700 text-slate-200 border-slate-500";

  return (
    <div className="rounded-[1.5rem] bg-[#0B223D] border border-white/10 p-5 hover:-translate-y-2 transition shadow-lg">
      <div className="h-32 rounded-2xl bg-[#071A2F] border border-white/10 flex items-center justify-center mb-4">
        <BedDouble className="text-white" size={45} />
      </div>

      <h4 className="text-xl font-black text-white">Room {room.roomNumber}</h4>

      <p className="text-sm text-slate-400 mt-1">
        {room.type} • Floor {room.floor}
      </p>

      <p className="text-sm text-slate-400 mb-4">
        Wi-Fi • Bathroom • Study Table
      </p>

      <span className={`px-3 py-1 rounded-full border text-xs font-black ${badgeColor}`}>
        {room.status === "Available" ? "Available" : "Not Available"}
      </span>

      <button
        disabled={room.status !== "Available"}
        className={`w-full mt-5 py-3 rounded-2xl font-bold ${
          room.status === "Available"
            ? "bg-white text-[#071A2F] hover:bg-slate-200"
            : "bg-slate-800 text-slate-500 cursor-not-allowed"
        }`}
      >
        {room.status === "Available" ? "Book Room" : "Already Booked"}
      </button>
    </div>
  );
}

export default RoomCard;