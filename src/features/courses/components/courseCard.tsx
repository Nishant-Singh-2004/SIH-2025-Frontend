import { useCourseStore, coursesData } from '../../../store/coursestore';
import { motion } from 'framer-motion';
import { TeacherIcon } from '../../../components/ui/icons';
type Course = typeof coursesData[0];

type CourseCardProps = {
  course: Course;
};

export const CourseCard = ({ course }: CourseCardProps) => {
  const { selectCourse } = useCourseStore();

  return (
    <motion.div
      onClick={() => selectCourse(course)}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer group"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ duration: 0.2 }}
      layoutId={`course-card-${course.id}`}
    >
      {/* Gradient Banner */}
      <div className={`h-28 ${course.bannerColor.replace('bg-','bg-gradient-to-br from-').replace('-500','-500 to-indigo-600')} p-4 flex flex-col justify-end relative`}>
        <h3 className="text-xl font-bold text-white truncate drop-shadow-md">{course.name}</h3>
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
            Grade {course.name.split(' ')[1]}
        </div>
      </div>
      
      {/* Footer with Teacher Info */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <TeacherIcon className="h-4 w-4" />
          <span>{course.teacher}</span>
        </div>
      </div>
    </motion.div>
  );
};

