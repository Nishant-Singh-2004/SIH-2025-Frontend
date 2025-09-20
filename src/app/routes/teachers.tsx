import type { JSX } from "react";
import { DataTable } from "../../components/tables";

// --- Mock Data ---
const teachersData = [
    { id: '1', name: 'Dr. Priya Sharma', email: 'priya.s@school.com', contact: '111-222-3333' },
    { id: '2', name: 'Mr. Rajesh Kumar',  email: 'rajesh.k@school.com', contact: '444-555-6666' },
    { id: '3', name: 'Ms. Kavita Singh', email: 'kavita.s@school.com', contact: '777-888-9999' },
];

type Teacher = {
    id: string;
    name: string;
    email: string;
    contact: string;
};

const teacherColumns: { accessor: keyof Teacher; header: string; cell?: (item: Teacher) => JSX.Element }[] = [
    { accessor: 'id', header: 'Registraion Number'},
    { accessor: 'name', header: 'Teacher Name' },
    { accessor: 'email', header: 'Email' },
    { accessor: 'contact', header: 'Contact' },
];

const TeachersPage = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-1">Teachers List</h1>
                 {/* Add Teacher Button can go here */}
            </div>
            <DataTable columns={teacherColumns} data={teachersData} />
        </div>
    );
};

export default TeachersPage;
