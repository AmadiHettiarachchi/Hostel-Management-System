import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  QrCode,
  AlertTriangle,
  LogIn,
  LogOut,
} from "lucide-react";

function CheckRecords() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/check-records");
      const data = await res.json();

      if (Array.isArray(data)) {
        setRecords(data);
      }
    } catch (error) {
      console.log("Fetch check records error:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const today = new Date().toLocaleDateString();

  const todayCheckIns = records.filter(
    (record) =>
      record.checkType === "Check In" &&
      new Date(record.createdAt).toLocaleDateString() === today
  ).length;

  const todayCheckOuts = records.filter(
    (record) =>
      record.checkType === "Check Out" &&
      new Date(record.createdAt).toLocaleDateString() === today
  ).length;

  const lateCheckIns = records.filter((record) => record.isLate).length;

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Check-in / Check-out Records
          </h1>
          <p className="text-sm text-[#7A6252]">
            Monitor student hostel entry and exit times
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
        <section className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card title="Today Check-ins" value={todayCheckIns} icon={LogIn} />
          <Card title="Today Check-outs" value={todayCheckOuts} icon={LogOut} />
          <Card title="Late Check-ins" value={lateCheckIns} icon={AlertTriangle} />
          <Card title="QR Refresh" value="50s" icon={QrCode} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Student Check Records</h2>
          </div>

          {records.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                No check-in or check-out records yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl font-black">
                      {record.studentName}
                    </h3>

                    <p className="text-sm text-[#7A6252]">
                      Type: {record.checkType}
                    </p>

                    <p className="text-sm text-[#7A6252]">
                      Time: {record.checkTime}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        record.checkType === "Check In"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {record.checkType}
                    </span>

                    {record.isLate && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        Late Check-in
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 shadow-sm">
      <Icon className="text-[#800080] mb-4" size={32} />
      <h3 className="text-lg font-black">{title}</h3>
      <p className="text-3xl font-black text-[#800080] mt-2">{value}</p>
    </div>
  );
}

export default CheckRecords;