import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

function StudentRatings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [ratings, setRatings] = useState([]);

  const [form, setForm] = useState({
    category: "",
    rating: "",
  });

  const API_URL = "http://localhost:5000/api/ratings";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchRatings = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        const myRatings = data.filter((item) => item.studentId === user?.id);
        setRatings(myRatings);
      }
    } catch (error) {
      console.log("Fetch ratings error:", error);
    }
  };

  const submitRating = async (e) => {
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
          category: form.category,
          rating: form.rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Rating failed");
        return;
      }

      alert("Rating submitted successfully");

      setForm({
        category: "",
        rating: "",
      });

      fetchRatings();
    } catch (error) {
      console.log("Submit rating error:", error);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Hostel Ratings
          </h1>
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
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8">
            <h2 className="text-2xl font-black mb-6">Submit Rating</h2>

            <form onSubmit={submitRating} className="space-y-4">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Rooms">Rooms</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Security">Security</option>
                <option value="Visitor Process">Visitor Process</option>
                <option value="Payment Process">Payment Process</option>
                <option value="Overall Hostel Experience">
                  Overall Hostel Experience
                </option>
              </select>

              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                required
                className="w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Select Rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Submit Rating
              </button>
            </form>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8">
            <h2 className="text-2xl font-black mb-6">My Ratings</h2>

            {ratings.length === 0 ? (
              <p className="text-[#7A6252]">No ratings submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {ratings.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl p-4"
                  >
                    <h3 className="font-black">{item.category}</h3>

                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(item.rating)].map((_, index) => (
                        <Star
                          key={index}
                          size={20}
                          fill="#FFD700"
                          color="#FFD700"
                        />
                      ))}
                    </div>
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

export default StudentRatings;