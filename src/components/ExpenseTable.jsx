// import React, { useEffect, useState } from 'react';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor('date', {
//     header: 'Date',
//     cell: info => info.getValue(),
//   }),
//   columnHelper.accessor('category', {
//     header: 'Category',
//     cell: info => info.getValue(),
//   }),
//   columnHelper.accessor('amount', {
//     header: 'Amount',
//     cell: info => `$${info.getValue().toFixed(2)}`,
//   }),
//   columnHelper.accessor('notes', {
//     header: 'Notes',
//     cell: info => info.getValue(),
//   }),
// ];

// export default function ExpenseTable() {
//   const [data, setData] = useState([]); // State to store fetched expenses
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
//         const response = await fetch('http://localhost:5000/api/expenses', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch expenses');
//         }

//         const expenses = await response.json();
//         setData(expenses);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (loading) {
//     return <p>Loading expenses...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">Error: {error}</p>;
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id} className="border-b dark:border-gray-700">
//                 {headerGroup.headers.map(header => (
//                   <th key={header.id} className="text-left p-4">
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id} className="border-b dark:border-gray-700">
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id} className="p-4">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('notes', {
    header: 'Notes',
    cell: info => info.getValue(),
  }),
];

export default function ExpenseTable() {
  const [data, setData] = useState([]); // State to store fetched expenses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
        const response = await fetch('http://localhost:5000/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();
        const sortedExpenses = expenses.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ); // Sort by descending date
        setData(sortedExpenses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const groupByMonth = expenses => {
    return expenses.reduce((acc, expense) => {
      const month = new Date(expense.date).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(expense);
      return acc;
    }, {});
  };

  const groupedExpenses = groupByMonth(data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <p>Loading expenses...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {Object.entries(groupedExpenses).map(([month, expenses]) => (
        <div key={month} className="mb-8">
          <h2 className="text-lg font-bold p-4 bg-gray-100 dark:bg-gray-700">
            {month}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b dark:border-gray-700">
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="text-left p-4">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr
                    key={expense._id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="p-4">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">{expense.category}</td>
                    <td className="p-4">${expense.amount.toFixed(2)}</td>
                    <td className="p-4">{expense.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

