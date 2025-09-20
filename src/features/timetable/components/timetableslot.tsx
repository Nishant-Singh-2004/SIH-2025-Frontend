import { useAuthStore } from '../../../store/authstore';
import { useTimetableStore} from '../../../store/timetablestore';
import type { ScheduleEntry, SlotIdentifier } from '../../../store/timetablestore';
import { LocationIcon, DepartmentIcon } from '../../../components/ui/icons';

// --- Dynamic styling for scheduled classes ---
const colorStyles = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', accent: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', accent: 'text-green-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', accent: 'text-purple-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', accent: 'text-yellow-600' },
};

// --- Component to display a scheduled class ---
const ScheduledClass = ({ entry }: { entry: ScheduleEntry }) => {
    const styles = colorStyles[entry.color];
    return (
        <div className={`p-3 rounded-lg h-full flex flex-col text-left ${styles.bg} border ${styles.border}`}>
            <h3 className={`font-bold text-sm ${styles.text}`}>{entry.subject}</h3>
            <p className={`text-xs ${styles.accent}`}>{entry.teacher}</p>
            <div className="mt-auto space-y-1 pt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                    <LocationIcon /> <span>{entry.classroom}</span>
                </div>
                <p className={`font-semibold ${styles.text}`}>{entry.grade}</p>
                <div className="flex items-center gap-1.5">
                   <DepartmentIcon /> <span>{entry.department}</span>
                </div>
            </div>
        </div>
    );
};

// --- Main Timetable Slot Component ---
export const TimetableSlot = ({ day, time, entry }: { day: string; time: string; entry: ScheduleEntry | null }) => {
    const { userRole } = useAuthStore();
    const { openModal } = useTimetableStore();
    const isAdmin = userRole === 'admin';

    const handleSlotClick = () => {
        if (isAdmin && !entry) {
            openModal({ day, time });
        }
    };

    const isFree = !entry;
    const isClickable = isAdmin && isFree;

    return (
        <div
            onClick={handleSlotClick}
            className={`
                h-40 rounded-xl transition-all duration-200
                ${isClickable ? 'cursor-pointer hover:bg-gray-100' : ''}
                ${isFree ? 'bg-white border-2 border-dashed border-gray-200 flex items-center justify-center' : ''}
            `}
        >
            {isFree ? (
                <span className="text-gray-400 text-sm">{isClickable ? 'Add Class' : 'Free'}</span>
            ) : (
                <ScheduledClass entry={entry} />
            )}
        </div>
    );
};
