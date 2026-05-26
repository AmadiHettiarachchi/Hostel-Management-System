import { useEffect, useState } from "react";

function BackendTest() {
  const [message, setMessage] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.log("BACKEND TEST ERROR:", error);
        setMessage("Backend connection failed");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6EFE6]">
      <h1 className="text-3xl font-bold text-[#800080]">{message}</h1>
    </div>
  );
}

export default BackendTest;