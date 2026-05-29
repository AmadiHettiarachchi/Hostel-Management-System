import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

function RatingsManagement() {
  const [ratings, setRatings] = useState([]);

  const API_URL = "http://localhost:5000/api/ratings";

  const fetchRatings = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setRatings(data);
      }
    } catch (error) {
      console.log("Fetch ratings error:", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
        ).toFixed(1)
      : "0.0";

  const categories = [
    "Rooms",
    "Cleaning",
    "Security",
    "Visitor Process",
    "Payment Process",
    "Overall Hostel Experience",
  ];

  const getCategoryAverage = (category) => {
    const categoryRatings = ratings.filter((item) => item.category === category);

    if (categoryRatings.length === 0) {
      return "0.0";
    }

    return (
      categoryRatings.reduce((sum, item) => sum + item.rating, 0) /
      categoryRatings.length
    ).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Ratings Management
          </h1>
          <p className="text-sm text-[#7A6252]">
            View student ratings and hostel satisfaction
          </p>
        </div>

        <Link
          to="/warden-dashboard"
          className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2 font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 shadow-sm">
            <Star className="text-[#800080] mb-4" size={32} />
            <h3 className="text-xl font-black">Average Rating</h3>
            <p className="text-4xl font-black text-[#800080] mt-2">
              {averageRating} / 5
            </p>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 shadow-sm">
            <Star className="text-[#800080] mb-4" size={32} />
            <h3 className="text-xl font-black">Total Ratings</h3>
            <p className="text-4xl font-black text-[#800080] mt-2">
              {ratings.length}
            </p>
          </div>
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-black mb-6">Category Ratings</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
              >
                <h3 className="font-black">{category}</h3>

                <p className="text-3xl font-black text-[#800080] mt-2">
                  {getCategoryAverage(category)} / 5
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <h2 className="text-2xl font-black mb-6">All Student Ratings</h2>

          {ratings.length === 0 ? (
            <p className="text-[#7A6252]">No ratings submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {ratings.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5 flex flex-col md:flex-row md:justify-between gap-4"
                >
                  <div>
                    <h3 className="text-xl font-black">
                      {item.studentName}
                    </h3>

                    <p className="text-sm text-[#7A6252]">
                      {item.studentEmail}
                    </p>

                    <p className="text-sm text-[#7A6252] mt-2">
                      Category: {item.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, index) => (
                      <Star
                        key={index}
                        size={22}
                        fill="#FFD700"
                        color="#FFD700"
                      />
                    ))}
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

export default RatingsManagement;