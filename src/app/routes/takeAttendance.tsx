import AttendanceGenerator from "../../features/attendance/components/attendanceGen";


const TakeAttendancePage = () => {
    // In a real app, these IDs would come from context or props
    const courseId = "C-101";
    const subjectId = "S-MATH-01";

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold mb-1">Take Attendance</h1>
            <p className="text-gray-600 mb-6">Generate a QR code for your class to mark attendance.</p>
            <AttendanceGenerator courseId={courseId} subjectId={subjectId} />
        </div>
    );
};

export default TakeAttendancePage;
