import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  IdCard,
  BedDouble
} from "lucide-react";

function StudentProfile() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">

      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-black">
              Student Profile
            </h1>

            <p className="text-[#7A6252]">
              View your profile and room details
            </p>
          </div>

          <Link
            to="/student-dashboard"
            className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2"
          >
            <ArrowLeft size={18}/>
            Back
          </Link>

        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">

        <div className="bg-[#FFF7ED] rounded-[2rem] border border-[#E7CDB5] p-8">

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full bg-[#800080] flex items-center justify-center text-white mb-5">
              <User size={45}/>
            </div>

            <h2 className="text-3xl font-black">
              Student Name
            </h2>

            <p className="text-[#7A6252]">
              Profile data will load from backend
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <Info title="Email" icon={Mail}/>
            <Info title="Phone" icon={Phone}/>
            <Info title="NIC" icon={IdCard}/>
            <Info title="Room Number" icon={BedDouble}/>

          </div>

        </div>

      </main>
    </div>
  );
}

function Info({ title, icon: Icon }) {
  return (
    <div className="bg-[#F6EFE6] p-5 rounded-2xl border border-[#E7CDB5]">

      <div className="flex gap-3 items-center">

        <Icon className="text-[#800080]"/>

        <div>

          <p className="font-bold">
            {title}
          </p>

          <p className="text-[#7A6252]">
            —
          </p>

        </div>

      </div>

    </div>
  );
}

export default StudentProfile;