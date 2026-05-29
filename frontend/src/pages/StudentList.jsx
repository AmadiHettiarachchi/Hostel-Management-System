import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Mail, Phone, IdCard } from "lucide-react";

function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/students");
      const data = await res.json();

      if (Array.isArray(data)) {
        setStudents(data);
      }
    } catch (error) {
      console.log("Fetch students error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            Student List
          </h1>
          <p className="text-[#7A6252]">
            View all registered students in the hostel
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
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">
              Registered Students ({students.length})
            </h2>
          </div>

          {students.length === 0 ? (
            <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
              <p className="text-[#7A6252]">No students registered yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {students.map((student) => (
                <div
                  key={student._id}
                  className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-2xl p-5"
                >
                  <h3 className="text-xl font-black mb-3">
                    {student.fullName}
                  </h3>

                  <p className="text-sm text-[#7A6252] flex items-center gap-2">
                    <Mail size={16} />
                    {student.email}
                  </p>

                  <p className="text-sm text-[#7A6252] flex items-center gap-2 mt-2">
                    <Phone size={16} />
                    {student.phone}
                  </p>

                  <p className="text-sm text-[#7A6252] flex items-center gap-2 mt-2">
                    <IdCard size={16} />
                    NIC: {student.nic}
                  </p>

                  <p className="text-sm text-[#7A6252] mt-2">
                    Parent Phone: {student.parentPhone}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StudentList;