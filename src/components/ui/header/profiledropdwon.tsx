import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileMenuStore } from '../../../store/profilemenustore';
import { LogoutIcon, ProfileIcon } from '../icons';

const DropdownItem = ({ icon, label, isDanger = false }: { icon: React.ReactNode; label: string; isDanger?: boolean }) => {
    const textColor = isDanger ? 'text-red-500' : 'text-gray-700';
    const hoverBg = isDanger ? 'hover:bg-red-50' : 'hover:bg-gray-100';

    return (
        <a href="#" className={`flex items-center gap-3 px-4 py-2 text-sm ${textColor} ${hoverBg} transition-colors rounded-md`}>
            {icon}
            <span>{label}</span>
        </a>
    );
};

export const ProfileDropdown = () => {
    const { isOpen } = useProfileMenuStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-50"
                >
                    <div className="border-b border-gray-200 pb-2 mb-2">
                        <DropdownItem icon={<ProfileIcon />} label="Profile" />
                    </div>
                    <div>
                        <DropdownItem icon={<LogoutIcon />} label="Sign out" isDanger />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
