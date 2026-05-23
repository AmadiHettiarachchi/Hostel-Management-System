import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail, LogIn } from "lucide-react";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.accountType === "warden") {
        navigate("/warden-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#7A6252] hover:text-[#3B2F2F] mb-6"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2" style={{ color: "#800080" }}>
            Login
          </h1>
          <p className="text-[#7A6252]">
            Enter your details to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-[#5C4033]">Email</label>
            <div className="mt-2 flex items-center gap-3 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3">
              <Mail size={18} className="text-[#7A6252]" />
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-[#3B2F2F] placeholder:text-[#9A7B65]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-[#5C4033]">Password</label>
            <div className="mt-2 flex items-center gap-3 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3">
              <Lock size={18} className="text-[#7A6252]" />
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-transparent outline-none w-full text-[#3B2F2F] placeholder:text-[#9A7B65]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#800080] text-white py-4 rounded-xl font-black hover:bg-[#6A006A] transition"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#7A6252] mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-[#800080] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;