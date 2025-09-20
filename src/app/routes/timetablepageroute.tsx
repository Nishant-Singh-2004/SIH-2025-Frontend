import { TimetableGrid } from '../../features/timetable/components/timetable';

const TimetablePage = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold mb-1">Weekly Schedule</h1>
            <p className="text-gray-600 mb-6">Multi-department and multi-shift timetable view.</p>
            <TimetableGrid />
        </div>
    );
};

export default TimetablePage;
