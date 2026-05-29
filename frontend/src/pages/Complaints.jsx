import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

function Complaints() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [responses, setResponses] = useState({});

  const API_URL = "http://localhost:5000/api/feedbacks";

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setFeedbacks(data);
      }
    } catch (error) {
      console.log("Fetch feedbacks error:", error);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: value,
    });
  };

  const updateFeedback = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          response: responses[id] || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Updated successfully");
      fetchFeedbacks();
    } catch (error) {
      console.log("Update feedback error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const pendingCount = feedbacks.filter((item) => item.status === "Pending").length;
  const progressCount = feedbacks.filter((item) => item.status === "In Progress").length;
  const resolvedCount = feedbacks.filter((item) => item.status === "Resolved").length;

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Feedback / Complaints
          </h1>
          <p className="text-sm text-[#7A6252]">
            View and respond to student feedback and complaints
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
          <Card title="Pending" value={pendingCount} icon={AlertCircle} />
          <Card title="In Progress" value={progressCount} icon={Clock} />
          <Card title="Resolved" value={resolvedCount} icon={CheckCircle} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Student Records</h2>
          </div>

          {feedbacks.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                No feedback or complaints submitted yet.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {feedbacks.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                    <div className="flex-1">
                      <h3 className="text-xl font-black">
                        {item.type} - {item.category}
                      </h3>

                      <p className="text-sm text-[#7A6252] mt-1">
                        Student: {item.studentName}
                      </p>

                      <p className="text-sm text-[#7A6252]">
                        Email: {item.studentEmail}
                      </p>

                      <p className="text-sm text-[#7A6252] mt-3">
                        Message:
                      </p>

                      <p className="text-[#3B2F2F] font-medium">
                        {item.message}
                      </p>

                      {item.response && (
                        <div className="mt-4 bg-[#FFF7ED] border border-[#E7CDB5] rounded-xl p-4">
                          <p className="text-sm font-bold text-[#800080]">
                            Previous Warden Response:
                          </p>
                          <p className="text-sm text-[#7A6252]">
                            {item.response}
                          </p>
                        </div>
                      )}

                      <span
                        className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold ${
                          item.type === "Complaint"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.type}
                      </span>

                      <span
                        className={`inline-block mt-4 ml-2 px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="w-full lg:w-80">
                      <label className="text-sm font-bold text-[#5C4033]">
                        Warden Response
                      </label>

                      <textarea
                        rows="5"
                        placeholder="Type response..."
                        value={responses[item._id] || item.response || ""}
                        onChange={(e) =>
                          handleResponseChange(item._id, e.target.value)
                        }
                        className="mt-2 w-full bg-[#FFF7ED] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
                      ></textarea>

                      <div className="grid grid-cols-1 gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => updateFeedback(item._id, "In Progress")}
                          className="bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700"
                        >
                          Mark In Progress
                        </button>

                        <button
                          type="button"
                          onClick={() => updateFeedback(item._id, "Resolved")}
                          className="bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700"
                        >
                          Mark Resolved
                        </button>

                        <button
                          type="button"
                          onClick={() => updateFeedback(item._id, "Pending")}
                          className="bg-[#800080] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#6A006A]"
                        >
                          Mark Pending
                        </button>
                      </div>
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

export default Complaints;