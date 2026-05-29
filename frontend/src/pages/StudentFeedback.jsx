import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send, AlertCircle } from "lucide-react";

function StudentFeedback() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [feedbacks, setFeedbacks] = useState([]);

  const [form, setForm] = useState({
    type: "",
    category: "",
    message: "",
  });

  const API_URL = "http://localhost:5000/api/feedbacks";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        const myFeedbacks = data.filter(
          (feedback) => feedback.studentId === user?.id
        );
        setFeedbacks(myFeedbacks);
      }
    } catch (error) {
      console.log("Fetch feedback error:", error);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: user.id,
          studentName: user.fullName,
          studentEmail: user.email,
          type: form.type,
          category: form.category,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }

      alert(`${form.type} submitted successfully`);

      setForm({
        type: "",
        category: "",
        message: "",
      });

      fetchFeedbacks();
    } catch (error) {
      console.log("Submit feedback error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#800080]">
              Feedback / Complaints
            </h1>
            <p className="text-[#7A6252]">
              Submit feedback or complaints to the warden
            </p>
          </div>

          <Link
            to="/student-dashboard"
            className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2 font-bold"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Send className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Submit Request</h2>
            </div>

            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <Select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="Feedback">Feedback</option>
                <option value="Complaint">Complaint</option>
              </Select>

              <Select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="Room">Room</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Payment">Payment</option>
                <option value="Visitor">Visitor</option>
                <option value="Security">Security</option>
                <option value="Other">Other</option>
              </Select>

              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your feedback or complaint..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">My History</h2>
            </div>

            {feedbacks.length === 0 ? (
              <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
                <AlertCircle className="mx-auto text-[#800080] mb-4" size={45} />
                <p className="text-[#7A6252]">
                  No records submitted yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback._id}
                    className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                  >
                    <h3 className="text-xl font-black">
                      {feedback.type}
                    </h3>

                    <p className="text-sm text-[#7A6252]">
                      Category: {feedback.category}
                    </p>

                    <p className="text-sm text-[#7A6252] mt-2">
                      {feedback.message}
                    </p>

                    {feedback.response && (
                      <div className="mt-3 bg-[#FFF7ED] border border-[#E7CDB5] rounded-xl p-3">
                        <p className="text-sm font-bold text-[#800080]">
                          Warden Response:
                        </p>
                        <p className="text-sm text-[#7A6252]">
                          {feedback.response}
                        </p>
                      </div>
                    )}

                    <span
                      className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold ${
                        feedback.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : feedback.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {feedback.status}
                    </span>
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

export default StudentFeedback;