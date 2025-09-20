
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./routes/home";
import TimetablePage from "./routes/timetablepageroute";
import TakeAttendancePage from "./routes/takeAttendance";
import ScanQrPage from "./routes/scanQR";
import StudentsPage from "./routes/students";
import TeachersPage from "./routes/teachers";
import CoursesPage from "./routes/coursePage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timetable" element={<HomePage content={<TimetablePage />} />} /> 
        <Route path="/attendance" element={<HomePage content={<TakeAttendancePage />} />} />
        <Route path="/scan" element={<HomePage content={<ScanQrPage />} />} />
        <Route path="/students" element={<HomePage content={<StudentsPage />} />} />
        <Route path="/teachers" element={<HomePage content={<TeachersPage />} />} />
        <Route path="/courses" element={<HomePage content={<CoursesPage />} />} />
      </Routes>
    </BrowserRouter>
  );
};

