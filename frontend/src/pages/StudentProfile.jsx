import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Lock } from "lucide-react";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: user.id,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Password change failed");
        return;
      }

      alert("Password changed successfully");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.log("Password change error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">
            My Profile
          </h1>
          <p className="text-[#7A6252]">
            View your profile details and change password
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

      <main className="max-w-5xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Profile Details</h2>
            </div>

            <ProfileItem label="Full Name" value={user?.fullName} />
            <ProfileItem label="Email" value={user?.email} />
            <ProfileItem label="Account Type" value={user?.accountType} />

            <p className="text-sm text-[#7A6252] mt-6">
              Profile details cannot be edited by students. Contact warden if
              details are incorrect.
            </p>
          </div>

          <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-[#800080]" size={30} />
              <h2 className="text-2xl font-black">Change Password</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />

              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A]"
              >
                Change Password
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-bold text-[#7A6252]">{label}</p>
      <p className="bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 mt-2">
        {value || "Not available"}
      </p>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3 outline-none text-[#3B2F2F]"
      />
    </div>
  );
}

export default StudentProfile;