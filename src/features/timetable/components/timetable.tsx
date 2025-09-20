import React from 'react';
import { useTimetableStore } from '../../../store/timetablestore';
import { TimetableSlot } from '../components/timetableslot';
import { AddScheduleModal } from '../components/schedule';

// --- Timetable Configuration ---
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00'];

export const TimetableGrid = () => {
    const { schedule } = useTimetableStore();

    return (
        <>
            <div className="grid grid-cols-6 gap-2 text-center text-sm font-semibold text-gray-600">
                <div className="p-2">Time</div>
                {days.map(day => <div key={day} className="p-4 bg-white rounded-lg shadow-sm">{day}</div>)}
            </div>

            <div className="grid grid-cols-6 gap-2 mt-2">
                {timeSlots.map(time => (
                    <React.Fragment key={time}>
                        <div className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-center">
                            <span className="font-semibold text-gray-700">{time}</span>
                        </div>
                        {days.map(day => {
                            const entry = schedule[`${day}_${time}`] || null;
                            return <TimetableSlot key={`${day}-${time}`} day={day} time={time} entry={entry} />;
                        })}
                    </React.Fragment>
                ))}
            </div>

            <AddScheduleModal />
        </>
    );
};
