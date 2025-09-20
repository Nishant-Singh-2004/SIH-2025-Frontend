import { CourseIcon } from '../../../components/ui/icons';

type SubjectCardProps = {
  name: string;
};

export const SubjectCard = ({ name }: SubjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-full">
            <CourseIcon className="h-6 w-6 text-indigo-500 dark:text-indigo-300" />
        </div>
        <h4 className="font-semibold text-lg text-gray-800 dark:text-black-200">{name}</h4>
    </div>
  );
};

