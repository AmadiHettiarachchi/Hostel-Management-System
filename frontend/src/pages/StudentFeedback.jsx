import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send, AlertCircle } from "lucide-react";

function StudentFeedback() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Feedback / Complaints</h1>
            <p className="text-[#7A6252]">
              Send complaints, feedback or suggestions to the warden
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
              <h2 className="text-2xl font-black">Submit Feedback</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Category
                </label>
                <select className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]">
                  <option>Room</option>
                  <option>Cleaning</option>
                  <option>Payment</option>
                  <option>Visitor</option>
                  <option>Security</option>
                  <option>Other</option>
                </select>
              </div>

              <Input label="Subject" placeholder="Enter subject" />

              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your feedback or complaint..."
                  className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Submit Feedback
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">My Feedback History</h2>
            </div>

            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <AlertCircle className="mx-auto text-[#800080] mb-4" size={45} />
              <p className="text-[#7A6252]">
                No feedback records loaded yet. Your submitted feedback and
                warden replies will appear here after backend connection.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

export default StudentFeedback;