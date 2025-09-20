import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarStore } from '../../../store/sidebarstore';
import { useAuthStore } from '../../../store/authstore';
import type { UserRole } from '../../../store/authstore';
import { Link, useLocation } from 'react-router'; // 1. Import Link and useLocation

import {
    LogoIcon, HomeIcon, StudentsIcon, TimetableIcon, CourseIcon,
    TakeAttendanceIcon, AssignActivitiesIcon, ScanIcon, PreferencesIcon,
    TeacherIcon
} from '../icons';

// --- 2. Updated Navigation Item Component ---
const NavItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    const activeClasses = isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
    return (
        // Use Link component for navigation
        <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeClasses}`}>
            {icon}
            <span>{label}</span>
        </Link>
    );
};

// --- 3. Updated Role-Based Navigation Data with "to" paths ---
const navConfig: Record<UserRole, { title: string; items: { icon: React.ReactElement; label: string; to: string }[] }[]> = {
    admin: [
        { title: 'Overview', items: [{ icon: <HomeIcon />, label: 'Dashboard', to: '/' }] },
        { title: 'Academic Management', items: [
            { icon: <StudentsIcon />, label: 'Students', to: '/students' },
            { icon: <TeacherIcon />, label: 'Teachers', to: '/teachers'},
            { icon: <TimetableIcon />, label: 'Timetable', to: '/timetable' },
            { icon: <CourseIcon />, label: 'Courses', to: '/courses' },
        ]},
    ],
    teacher: [
        { title: 'Overview', items: [{ icon: <HomeIcon />, label: 'Dashboard', to: '/' }] },
        { title: 'Classroom Tools', items: [
            { icon: <StudentsIcon />, label: 'Students', to: '/students' },
            { icon: <TakeAttendanceIcon />, label: 'Take Attendance', to: '/attendance' },
            { icon: <TimetableIcon />, label: 'View Schedule', to: '/timetable' },
            { icon: <AssignActivitiesIcon />, label: 'Assign Activities', to: '/activities' },
        ]},
    ],
    student: [
        { title: 'Main', items: [
            { icon: <HomeIcon />, label: 'Home', to: '/' },
            { icon: <TimetableIcon />, label: 'My Schedule', to: '/timetable' },
            { icon: <ScanIcon />, label: 'Scan QR', to: '/scan' },
            { icon: <PreferencesIcon />, label: 'Preferences', to: '/preferences' },
        ]},
    ],
};


// --- Main Sidebar Content ---
const SidebarContent = () => {
    const { userRole } = useAuthStore();
    const navigationSections = navConfig[userRole];

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            <div className="flex items-center gap-2 h-16 border-b border-gray-200 px-4">
                <LogoIcon />
                <span className="text-xl font-bold text-gray-800">SmartClass</span>
            </div>
            <nav className="flex-1 p-4 space-y-4">
                {navigationSections.map(section => (
                    <div key={section.title}>
                        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.title}</p>
                        <div className="mt-2 space-y-1">
                            {section.items.map(item => (
                                <NavItem key={item.label} icon={item.icon} label={item.label} to={item.to} />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

// --- Sidebar Component (Handles Mobile/Desktop Views) ---
export const Sidebar = () => {
    const { isOpen, close } = useSidebarStore();
    return (
        <>
            <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                <SidebarContent />
            </aside>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={close}
                            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 left-0 h-full w-64 z-50 lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

