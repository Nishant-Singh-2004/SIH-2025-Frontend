import type { JSX } from "react";
import { DataTable } from "../../components/tables";

// --- Mock Data ---
const studentsData = [
    { id: '1', name: 'Rishabh Singh', class: '10A' , email: 'rishabh1234@gmail.com'},
    { id: '2', name: 'Priya Sharma', class: '11B' , email: 'priya12@gmail.com'},
    { id: '3', name: 'Amit Kumar', class: '9C' , email: 'amit1100@gmail.com'},
    { id: '4', name: 'Sneha Patel', class: '12A' , email: 'sneha0101@gmail.com'},
];

const studentColumns: {
    accessor: "id" | "name" | "class" | "email";
    header: string;
    cell?: (item: typeof studentsData[0]) => JSX.Element;
}[] = [
    { accessor: 'id', header: 'Roll Number' },
    { accessor: 'name', header: 'Student Name' },
    { accessor: 'class', header: 'Class' },
    { accessor: 'email', header: 'Email' },
];

const StudentsPage = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-1">Students List</h1>
                {/* Add Student Button can go here */}
            </div>
            <DataTable columns={studentColumns} data={studentsData} />
        </div>
    );
};

export default StudentsPage;
