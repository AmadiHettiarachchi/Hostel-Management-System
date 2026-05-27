import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  LogIn,
  LogOut,
} from "lucide-react";

function VisitorManagement() {
  const [visitors, setVisitors] = useState([]);

  const API_URL = "http://localhost:5000/api/visitors";

  const fetchVisitors = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setVisitors(data);
      }
    } catch (error) {
      console.log("Fetch visitors error:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Status update failed");
        return;
      }

      alert(`Visitor request ${status}`);
      fetchVisitors();
    } catch (error) {
      console.log("Status update error:", error);
      alert("Server error");
    }
  };

  const updateTime = async (id, field) => {
    const now = new Date().toLocaleString();

    const visitor = visitors.find((item) => item._id === id);

    const payload = {
      checkInTime: visitor?.checkInTime || "",
      checkOutTime: visitor?.checkOutTime || "",
    };

    if (field === "checkInTime") {
      payload.checkInTime = now;
    }

    if (field === "checkOutTime") {
      payload.checkOutTime = now;
    }

    try {
      const res = await fetch(`${API_URL}/${id}/time`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Time update failed");
        return;
      }

      alert("Visitor time updated");
      fetchVisitors();
    } catch (error) {
      console.log("Time update error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const pending = visitors.filter((v) => v.status === "Pending").length;
  const accepted = visitors.filter((v) => v.status === "Accepted").length;
  const declined = visitors.filter((v) => v.status === "Declined").length;

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Visitor Management
          </h1>
          <p className="text-sm text-[#7A6252]">
            Manage visitor appointments and check-in/out times
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
        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card title="Pending Requests" value={pending} icon={Clock} />
          <Card title="Accepted Visitors" value={accepted} icon={CheckCircle} />
          <Card title="Declined Visitors" value={declined} icon={XCircle} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Visitor Requests</h2>
          </div>

          {visitors.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                No visitor requests yet.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {visitors.map((visitor) => (
                <div
                  key={visitor._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-black">
                        {visitor.visitorName}
                      </h3>

                      <p className="text-sm text-[#7A6252]">
                        Phone: {visitor.phone}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        NIC: {visitor.nic}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        Visiting Student: {visitor.studentName}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        Visit Date: {visitor.visitDate}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        Check-in: {visitor.checkInTime || "Not checked in"}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        Check-out: {visitor.checkOutTime || "Not checked out"}
                      </p>

                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                          visitor.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : visitor.status === "Declined"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {visitor.status}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                      {visitor.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(visitor._id, "Accepted")}
                            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700"
                          >
                            <CheckCircle size={18} />
                            Accept
                          </button>

                          <button
                            onClick={() => updateStatus(visitor._id, "Declined")}
                            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-red-700"
                          >
                            <XCircle size={18} />
                            Decline
                          </button>
                        </>
                      )}

                      {visitor.status === "Accepted" && (
                        <>
                          <button
                            onClick={() =>
                              updateTime(visitor._id, "checkInTime")
                            }
                            className="flex items-center justify-center gap-2 bg-[#800080] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#6A006A]"
                          >
                            <LogIn size={18} />
                            Check In
                          </button>

                          <button
                            onClick={() =>
                              updateTime(visitor._id, "checkOutTime")
                            }
                            className="flex items-center justify-center gap-2 bg-[#F3E2D0] border border-[#E7CDB5] text-[#3B2F2F] px-4 py-3 rounded-xl font-bold hover:bg-[#E7CDB5]"
                          >
                            <LogOut size={18} />
                            Check Out
                          </button>
                        </>
                      )}
                    </div>
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
      <h3 className="text-xl font-black">{title}</h3>
      <p className="text-4xl font-black text-[#800080] mt-2">{value}</p>
    </div>
  );
}

export default VisitorManagement;