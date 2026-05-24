import { Link } from "react-router-dom";
import { ArrowLeft, Star, Send, ClipboardList } from "lucide-react";

function StudentRatings() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Ratings</h1>
            <p className="text-[#7A6252]">
              Rate hostel facilities and services
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
              <Star className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Submit Rating</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Service Category
                </label>
                <select className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]">
                  <option>Room Facility</option>
                  <option>Cleaning</option>
                  <option>Security</option>
                  <option>Visitor Process</option>
                  <option>Payment Process</option>
                  <option>Overall Hostel Experience</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Rating
                </label>

                <div className="mt-3 flex gap-3">
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      className="w-12 h-12 rounded-xl bg-[#F6EFE6] border border-[#E7CDB5] flex items-center justify-center hover:bg-[#F3E2D0]"
                    >
                      <Star size={22} className="text-[#800080]" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-[#5C4033]">
                  Comment
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your experience..."
                  className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F] placeholder:text-[#9A7B65]"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                <Send size={20} />
                Submit Rating
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">My Rating History</h2>
            </div>

            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">
                No ratings submitted yet. Your rating history will appear here
                after backend connection.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentRatings;