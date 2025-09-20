import { create } from 'zustand';

// --- Types and Interfaces ---

// Represents a single scheduled class
export interface ScheduleEntry {
    id: string;
    course: string;
    subject: string;
    teacher: string;
    classroom: string;
    grade: string;
    department: string;
    color: 'blue' | 'green' | 'purple' | 'yellow';
}

// Defines the location of a slot in the grid
export interface SlotIdentifier {
    day: string;
    time: string;
}

// Type for the schedule data, mapping a slot identifier to a schedule entry
export type ScheduleData = Record<string, ScheduleEntry | null>;

// State and actions for the timetable store
interface TimetableState {
    schedule: ScheduleData;
    isModalOpen: boolean;
    selectedSlot: SlotIdentifier | null;
    openModal: (slot: SlotIdentifier) => void;
    closeModal: () => void;
    addScheduleEntry: (slot: SlotIdentifier, entry: Omit<ScheduleEntry, 'id'>) => void;
}

// --- Initial Mock Data ---

const initialSchedule: ScheduleData = {
    'Monday_08:00-09:00': {
        id: '1', course: 'Mathematics', subject: 'Algebra', teacher: 'Dr. Priya Sharma', classroom: 'Room 101',
        grade: 'Grade 10A', department: 'Mathematics Department', color: 'blue'
    },
    'Monday_09:00-10:00': {
        id: '2', course: 'Science', subject: 'Physics', teacher: 'Prof. Rajesh Kumar', classroom: 'Lab A',
        grade: 'Grade 11B', department: 'Science Department', color: 'green'
    },
    'Monday_10:00-11:00': {
        id: '3', course: 'Languages', subject: 'English', teacher: 'Ms. Kavita Singh', classroom: 'Room 203',
        grade: 'Grade 9A', department: 'Languages Department', color: 'purple'
    },
    'Monday_11:00-12:00': {
        id: '4', course: 'Science', subject: 'Chemistry', teacher: 'Dr. Sunita Patel', classroom: 'Lab B',
        grade: 'Grade 12A', department: 'Science Department', color: 'yellow'
    },
};

// --- Zustand Store Implementation ---

export const useTimetableStore = create<TimetableState>((set) => ({
    schedule: initialSchedule,
    isModalOpen: false,
    selectedSlot: null,
    openModal: (slot) => set({ isModalOpen: true, selectedSlot: slot }),
    closeModal: () => set({ isModalOpen: false, selectedSlot: null }),
    addScheduleEntry: (slot, entry) =>
        set((state) => ({
            schedule: {
                ...state.schedule,
                [`${slot.day}_${slot.time}`]: {
                    ...entry,
                    id: new Date().toISOString(), // Generate a unique ID
                },
            },
            isModalOpen: false,
            selectedSlot: null,
        })),
}));
