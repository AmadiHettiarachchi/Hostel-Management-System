import { Link } from "react-router-dom";
import { ArrowLeft, Users, CheckCircle, XCircle, Clock } from "lucide-react";

function VisitorManagement() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black" style={{ color: '#800080' }}>Visitor Management</h1>
          <p className="text-sm text-[#7A6252]">
            Manage visitor appointments and check-in/out times
          </p>
        </div>

        <Link
          to="/warden-dashboard"
          className="flex items-center gap-2 bg-[#800080] text-white px-4 py-3 rounded-xl font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card title="Pending Requests" icon={Clock} />
          <Card title="Accepted Visitors" icon={CheckCircle} />
          <Card title="Declined Visitors" icon={XCircle} />
        </section>

        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-[#800080]" size={30} />
            <h2 className="text-2xl font-black">Visitor Requests</h2>
          </div>

          <div className="border border-dashed border-[#E7CDB5] rounded-2xl p-10 text-center">
            <p className="text-[#7A6252]">
              No visitor requests loaded yet. Visitor appointments will appear
              here after connecting backend.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ title, icon: Icon }) {
  return (
    <div className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-2xl p-6 shadow-sm">
      <Icon className="text-[#800080] mb-4" size={32} />
      <h3 className="text-xl font-black">{title}</h3>
      <p className="text-[#7A6252] text-sm mt-2">No data loaded</p>
    </div>
  );
}

export default VisitorManagement;