import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Phone,
  IdCard,
  UserPlus,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nic: "",
    parentPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration successful");
      navigate("/student-dashboard");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      alert("Server error. Please check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#7A6252] hover:text-[#3B2F2F] mb-6"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2 text-[#800080]" style={{ color: "#800080" }}>
            Create Student Account
          </h1>
          <p className="text-[#7A6252]">
            Register as a student to access your hostel dashboard.
          </p>
        </div>

        <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-5">
          <Input icon={User} label="Full Name" name="fullName" placeholder="Enter full name" value={form.fullName} onChange={handleChange} />
          <Input icon={Mail} label="Email" name="email" placeholder="Enter email" type="email" value={form.email} onChange={handleChange} />
          <Input icon={Phone} label="Phone Number" name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} />
          <Input icon={IdCard} label="NIC" name="nic" placeholder="Enter NIC number" value={form.nic} onChange={handleChange} />
          <Input icon={Phone} label="Parent Phone Number" name="parentPhone" placeholder="Enter parent phone number" value={form.parentPhone} onChange={handleChange} />
          <Input icon={Lock} label="Password" name="password" placeholder="Enter password" type="password" value={form.password} onChange={handleChange} />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A] transition"
            >
              <UserPlus size={20} />
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-[#7A6252] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#800080] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({ icon: Icon, label, name, placeholder, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-sm font-bold text-[#5C4033]">{label}</label>
      <div className="mt-2 flex items-center gap-3 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3">
        <Icon size={18} className="text-[#7A6252]" />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="bg-transparent outline-none w-full text-[#3B2F2F] placeholder:text-[#9A7B65]"
        />
      </div>
    </div>
  );
}

export default Register;