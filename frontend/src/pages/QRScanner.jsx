import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ArrowLeft, QrCode } from "lucide-react";

function QRScanner() {
  const [lastScan, setLastScan] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        if (decodedText === lastScan) return;

        setLastScan(decodedText);

        try {
          const res = await fetch("http://localhost:5000/api/check-records", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              qrData: decodedText,
            }),
          });

          const data = await res.json();

          alert(data.message);

          scanner.clear();
        } catch (error) {
          console.log(error);
          alert("Scan failed");
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [lastScan]);

  return (
    <div className="min-h-screen bg-[#F6EFE6] text-[#3B2F2F]">
      <header className="bg-[#F3E2D0] border-b border-[#E7CDB5] px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#800080]">QR Scanner</h1>
          <p className="text-[#7A6252]">
            Scan student QR. System automatically detects check-in or check-out.
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

      <main className="max-w-3xl mx-auto px-6 py-10">
        <section className="bg-[#FFF7ED] border border-[#E7CDB5] rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <QrCode className="text-[#800080]" size={32} />
            <h2 className="text-2xl font-black">Scan Student QR</h2>
          </div>

          <div
            id="qr-reader"
            className="bg-white rounded-2xl overflow-hidden"
          ></div>
        </section>
      </main>
    </div>
  );
}

export default QRScanner;