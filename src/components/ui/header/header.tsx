
import { BellIcon, ProfileIcon, HamburgerIcon } from '../icons'
import { useProfileMenuStore } from '../../../store/profilemenustore';
import { useSidebarStore } from '../../../store/sidebarstore';
import { useAuthStore } from '../../../store/authstore';
import { ProfileDropdown } from './profiledropdwon';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const DashboardHeader = () => {
    const { toggle: toggleProfileMenu } = useProfileMenuStore();
    const { toggle: toggleSidebar } = useSidebarStore();
    const { userRole } = useAuthStore();

    // --- Dynamic styling for role badge ---
    const roleBadgeStyles: Record<string, string> = {
        admin: 'bg-indigo-100 text-indigo-700',
        teacher: 'bg-teal-100 text-teal-700',
        student: 'bg-sky-100 text-sky-700',
    };
    return (
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section - Becomes hamburger on mobile */}
                    <div className="flex items-center gap-4">
                         <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-md">
                            <HamburgerIcon />
                        </button>
                        <div className="hidden lg:flex items-center gap-2">
                           <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${roleBadgeStyles[userRole]}`}>
                               {capitalize(userRole)}
                           </span>
                        </div>
                    </div>

                    {/* Middle Section - Search Bar */}
                    {/* <div className="flex-1 max-w-md ml-4">
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input
                                type="search"
                                placeholder="Search classrooms, schedule"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>
                    </div> */}

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                            <BellIcon />
                        </button>
                        <div className="relative">
                            <button onClick={toggleProfileMenu} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                                <ProfileIcon />
                            </button>
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

