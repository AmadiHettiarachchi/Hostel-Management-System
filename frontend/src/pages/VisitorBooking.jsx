import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Phone, IdCard, CalendarDays } from "lucide-react";
import bg from "../assets/background.jpg";

function VisitorBooking() {
  const [form, setForm] = useState({
    visitorName: "",
    phone: "",
    nic: "",
    studentName: "",
    visitDate: "",
  });

  const today = new Date().toISOString().slice(0, 16);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Visitor request failed");
        return;
      }

      alert("Visitor request submitted successfully");

      setForm({
        visitorName: "",
        phone: "",
        nic: "",
        studentName: "",
        visitDate: "",
      });
    } catch (error) {
      console.log("Visitor request error:", error);
      alert("Server error");
    }
  };

  return (
    <div
      className="min-h-screen text-[#3B2F2F] flex items-center justify-center px-6"
      style={{
        backgroundImage: `linear-gradient(rgba(246,239,230,0.84), rgba(246,239,230,0.84)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-xl bg-[#FFF7ED]/95 border border-[#E7CDB5] rounded-[2rem] p-8 shadow-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#7A6252] hover:text-[#3B2F2F] mb-6"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>

        <h1 className="text-3xl font-black mb-2 text-[#800080]">
          Visitor Appointment
        </h1>

        <p className="text-[#7A6252] mb-8">
          Fill this form to request a student visit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={User}
            name="visitorName"
            placeholder="Visitor Name"
            value={form.visitorName}
            onChange={handleChange}
          />

          <Input
            icon={Phone}
            name="phone"
            placeholder="Telephone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            icon={IdCard}
            name="nic"
            placeholder="NIC Number"
            value={form.nic}
            onChange={handleChange}
          />

          <Input
            icon={User}
            name="studentName"
            placeholder="Student Name"
            value={form.studentName}
            onChange={handleChange}
          />

          <Input
            icon={CalendarDays}
            name="visitDate"
            type="datetime-local"
            value={form.visitDate}
            onChange={handleChange}
            min={today}
          />

          <button
            type="submit"
            className="w-full bg-[#800080] hover:bg-[#6A006A] text-white py-4 rounded-xl font-bold"
          >
            Submit Appointment Request
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({
  icon: Icon,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  min,
}) {
  return (
    <div className="flex items-center gap-3 bg-[#F6EFE6] border border-[#E7CDB5] rounded-xl px-4 py-3">
      <Icon size={18} className="text-[#7A6252]" />

      <input
        name={name}
        type={type}
        min={min}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="bg-transparent outline-none w-full text-[#3B2F2F] placeholder:text-[#9A7B65]"
      />
    </div>
  );
}

export default VisitorBooking;