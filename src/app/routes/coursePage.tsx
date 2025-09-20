import { CourseCard } from "../../features/courses/components/courseCard";
import { CourseDetailView } from "../../features/courses/components/courseDetail";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { useAuthStore } from "../../store/authstore";
import { useCourseStore, coursesData } from "../../store/coursestore";
import { AnimatePresence, motion } from "framer-motion";

const CoursesGrid = () => {
    const { userRole } = useAuthStore();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-black">Courses</h1>
                {userRole === 'admin' && (
                     <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Course
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {coursesData.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </motion.div>
    );
}


const CoursesPage = () => {
    const { view } = useCourseStore();

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
                {view === 'grid' ? <CoursesGrid /> : <CourseDetailView />}
            </AnimatePresence>
        </div>
    );
};

export default CoursesPage;

