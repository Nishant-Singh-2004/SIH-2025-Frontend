import React from 'react';

type TableColumn<T> = {
  accessor: keyof T;
  header: string;
  cell?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
};

export const DataTable = <T extends { id: string | number }>({ columns, data }: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)} scope="col" className="px-6 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50">
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {col.cell ? col.cell(item) : String(item[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
