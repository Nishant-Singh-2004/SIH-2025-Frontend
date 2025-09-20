import { useCourseStore } from '../../../store/coursestore';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { ArrowLeftIcon, TeacherIcon } from '../../../components/ui/icons';
import { SubjectCard } from './subjectCard';

export const CourseDetailView = () => {
  const { selectedCourse, goBackToGrid } = useCourseStore();

  if (!selectedCourse) return null;

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        <Button onClick={goBackToGrid} variant="outline" size="icon" className="flex-shrink-0">
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-black">{selectedCourse.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <TeacherIcon className="h-4 w-4" />
                <span>Instructed by {selectedCourse.teacher}</span>
            </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-black-200 mb-4">Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {selectedCourse.subjects.map((subject) => (
          <SubjectCard key={subject.id} name={subject.name} />
        ))}
      </div>
    </motion.div>
  );
};

