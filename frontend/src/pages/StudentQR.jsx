import { Link } from "react-router-dom";
import { ArrowLeft, QrCode, TimerReset } from "lucide-react";

function StudentQR() {
  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">My QR</h1>
            <p className="text-[#7A6252]">
              Use QR for hostel check-in and check-out
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

      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto bg-[#800080] rounded-2xl flex items-center justify-center mb-6">
            <QrCode className="text-white" size={42} />
          </div>

          <h2 className="text-3xl font-black mb-3">Student QR Access</h2>

          <p className="text-[#7A6252] mb-8">
            Your QR check-in/check-out code will appear here after connecting
            backend QR generation.
          </p>

          <div className="w-72 h-72 mx-auto bg-[#F6EFE6] border border-[#E7CDB5] rounded-[2rem] flex items-center justify-center mb-8">
            <QrCode size={150} className="text-[#800080]" />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="bg-[#800080] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6A006A]"
            >
              Check In
            </button>

            <button
              type="button"
              className="bg-[#F6EFE6] border border-[#E7CDB5] text-[#3B2F2F] px-6 py-3 rounded-xl font-bold hover:bg-[#F3E2D0]"
            >
              Check Out
            </button>
          </div>
        </section>

        <section className="mt-8 bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <TimerReset className="text-[#800080]" size={30} />
            <div>
              <h3 className="text-xl font-black">QR Refresh Timer</h3>
              <p className="text-[#7A6252]">
                QR code will refresh every 50 seconds after backend connection.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentQR;