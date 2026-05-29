import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, QrCode, TimerReset } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function StudentQR() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [qrValue, setQrValue] = useState("");
  const [countdown, setCountdown] = useState(50);

  const generateQR = () => {
  if (!user) return;

  const qr = JSON.stringify({
    studentId: user.id,
    studentName: user.fullName,
    generatedAt: Date.now(),
  });

  setQrValue(qr);
  setCountdown(50);
};

  useEffect(() => {
    generateQR();

    const qrInterval = setInterval(generateQR, 50000);

    const timerInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 50));
    }, 1000);

    return () => {
      clearInterval(qrInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">My QR</h1>
          <p className="text-[#7A6252]">Show this QR at hostel entrance</p>
        </div>

        <Link
          to="/student-dashboard"
          className="bg-[#800080] text-white px-5 py-3 rounded-xl flex gap-2 font-bold"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto bg-[#800080] rounded-2xl flex items-center justify-center mb-6">
            <QrCode className="text-white" size={42} />
          </div>

          <h2 className="text-3xl font-black mb-3">Student QR Access</h2>

          <p className="text-[#7A6252] mb-8">
            This QR refreshes every 50 seconds. Warden must scan this QR.
          </p>

          <div className="w-72 h-72 mx-auto bg-white border border-[#E7CDB5] rounded-[2rem] flex items-center justify-center mb-8">
            {qrValue && <QRCodeCanvas value={qrValue} size={220} />}
          </div>

          <div className="flex items-center justify-center gap-3 text-[#800080] font-bold">
            <TimerReset size={22} />
            QR refreshes in {countdown}s
          </div>
        </section>
      </main>
    </div>
  );
}

export default StudentQR;