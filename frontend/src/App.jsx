import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VisitorBooking from "./pages/VisitorBooking";
import StudentDashboard from "./pages/StudentDashboard";
import WardenDashboard from "./pages/WardenDashboard";
import RoomAllocation from "./pages/RoomAllocation";
import CleaningManagement from "./pages/CleaningManagement";
import VisitorManagement from "./pages/VisitorManagement";
import PaymentManagement from "./pages/PaymentManagement";
import Components from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/visitor-booking" element={<VisitorBooking />} />

        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/warden-dashboard" element={<WardenDashboard />} />

        <Route path="/room-allocation" element={<RoomAllocation />} />
        <Route path="/cleaning-management" element={<CleaningManagement />} />
        <Route path="/visitor-management" element={<VisitorManagement />} />
        <Route path="/payment-management" element={<PaymentManagement />} />
        <Route path="/complaints" element={<Complaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;