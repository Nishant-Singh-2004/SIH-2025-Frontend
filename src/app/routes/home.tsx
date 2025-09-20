import React from 'react';
import { DashboardHeader } from '../../components/ui/header/header';
import { Sidebar } from '../../components/ui/header/sidebar';
import { useAuthStore } from '../../store/authstore';
import type {UserRole} from '../../store/authstore'

const RoleSwitcher = () => {
    const { userRole, setUserRole } = useAuthStore();
    const roles: UserRole[] = ['admin', 'teacher', 'student'];

    return (
        <div className="bg-gray-800 p-2 rounded-lg flex items-center gap-2">
            <p className="text-sm font-medium text-white">Switch View:</p>
            {roles.map(role => (
                <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                        userRole === role
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
            ))}
        </div>
    );
};

// This is the default content for the main dashboard page
const DefaultDashboard = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
            </div>
            <RoleSwitcher />
        </div>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Dashboard content area</p>
        </div>
    </div>
);

// The HomePage now accepts a 'content' prop to display different pages
const HomePage = ({ content }: { content?: React.ReactNode }) => {
  return (
    <div className="h-screen flex bg-gray-50 text-gray-800 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {/* It will render the passed 'content' or the default dashboard */}
            {content || <DefaultDashboard />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

