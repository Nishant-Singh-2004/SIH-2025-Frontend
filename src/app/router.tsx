
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./routes/home";
import TimetablePage from "./routes/timetablepageroute";
import TakeAttendancePage from "./routes/takeAttendance";
import ScanQrPage from "./routes/scanQR";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* The main dashboard page */}
        <Route path="/" element={<HomePage />} />
        
        {/* The timetable page, rendered inside the main layout */}
        <Route path="/timetable" element={<HomePage content={<TimetablePage />} />} /> 

        {/* Take Attendance page (teacher) */}
        <Route path="/attendance" element={<HomePage content={<TakeAttendancePage />} />} />

        {/* Scan QR page (student) */}
        <Route path="/scan" element={<HomePage content={<ScanQrPage />} />} />
      </Routes>
    </BrowserRouter>
  );
};

