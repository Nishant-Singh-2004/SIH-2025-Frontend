import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimetableStore } from '../../../store/timetablestore';
import type { ScheduleEntry } from '../../../store/timetablestore';
import { CloseIcon } from '../../../components/ui/icons';

export const AddScheduleModal = () => {
    const { isModalOpen, closeModal, selectedSlot, addScheduleEntry } = useTimetableStore();
    const [formData, setFormData] = useState({
        course: 'Mathematics',
        subject: '',
        teacher: '',
        classroom: '',
        grade: 'Grade 10A',
        department: 'Mathematics Department',
        color: 'blue',
    });

    if (!selectedSlot) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEntry = { ...formData } as Omit<ScheduleEntry, 'id'>;
        addScheduleEntry(selectedSlot, newEntry);
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">Add New Class</h2>
                                    <p className="text-sm text-gray-500">
                                        For {selectedSlot.day} at {selectedSlot.time}
                                    </p>
                                </div>
                                <button type="button" onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100">
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Form Fields */}
                                <div>
                                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                                    <select id="course" name="course" value={formData.course} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                        <option>Mathematics</option>
                                        <option>Science</option>
                                        <option>Languages</option>
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Teacher</label>
                                    <input type="text" id="teacher" name="teacher" value={formData.teacher} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="classroom" className="block text-sm font-medium text-gray-700">Classroom</label>
                                    <input type="text" id="classroom" name="classroom" value={formData.classroom} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-b-xl flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                    Add Schedule
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
