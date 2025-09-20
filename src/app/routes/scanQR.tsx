import AttendanceScanner from "../../features/attendance/components/attendanceScan";


const ScanQrPage = () => {
    // In a real app, this ID would come from the authenticated user's state
    const studentId = "ST-12345";

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold mb-1">Scan for Attendance</h1>
            <p className="text-gray-600 mb-6">Scan the QR code provided by your teacher to mark your attendance.</p>
            <AttendanceScanner studentId={studentId} />
        </div>
    );
};

export default ScanQrPage;
