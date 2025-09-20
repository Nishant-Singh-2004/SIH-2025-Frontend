import { create } from 'zustand';

// --- Mock Data ---
// In a real app, this would come from an API
export const coursesData = [
  { 
    id: 'C101', 
    name: 'Grade 10A - Science', 
    teacher: 'Dr. Priya Sharma', 
    bannerColor: 'bg-indigo-500',
    subjects: [
      { id: 'S1', name: 'Physics' },
      { id: 'S2', name: 'Chemistry' },
      { id: 'S3', name: 'Biology' },
    ]
  },
  { 
    id: 'C102', 
    name: 'Grade 11B - Mathematics', 
    teacher: 'Mr. Rajesh Kumar', 
    bannerColor: 'bg-teal-500',
    subjects: [
      { id: 'S4', name: 'Algebra II' },
      { id: 'S5', name: 'Geometry' },
      { id: 'S6', name: 'Trigonometry' },
      { id: 'S7', name: 'Calculus Prep' },
    ]
  },
  { 
    id: 'C103', 
    name: 'Grade 9C - Languages', 
    teacher: 'Ms. Kavita Singh', 
    bannerColor: 'bg-purple-500',
    subjects: [
      { id: 'S8', name: 'English Literature' },
      { id: 'S9', name: 'Hindi Grammar' },
    ]
  },
];

type Course = typeof coursesData[0];

interface CourseState {
  view: 'grid' | 'detail';
  selectedCourse: Course | null;
  selectCourse: (course: Course) => void;
  goBackToGrid: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  view: 'grid',
  selectedCourse: null,
  selectCourse: (course) => set({ view: 'detail', selectedCourse: course }),
  goBackToGrid: () => set({ view: 'grid', selectedCourse: null }),
}));
