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

// import React, { useEffect, useState } from 'react';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'


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
//   columnHelper.accessor('actions', {
//     header: 'Actions',
//     cell: ({ row }) => (
//       <div className="flex gap-2">
//         <button
//           onClick={() => setEditingExpense(row.original)}
//           className="p-1 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
//           aria-label="Edit expense"
//         >
//           <PencilIcon className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => setDeletingExpense(row.original)}
//           className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
//           aria-label="Delete expense"
//         >
//           <TrashIcon className="h-4 w-4" />
//         </button>
//       </div>
//     ),
//   }),
// ]

// export default function ExpenseTable() {
//   const [data, setData] = useState([]); // State to store fetched expenses
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [editingExpense, setEditingExpense] = useState(null)
//   const [deletingExpense, setDeletingExpense] = useState(null)
//   const handleDelete = (expense) => {
//     setData((current) => current.filter((item) => item.id !== expense.id))
//     toast.success('Expense deleted successfully')
//     setDeletingExpense(null)
//   }

//   const handleEdit = (updatedExpense) => {
//     setData((current) =>
//       current.map((item) =>
//         item.id === updatedExpense.id ? updatedExpense : item
//       )
//     )
//     toast.success('Expense updated successfully')
//     setEditingExpense(null)
//   }

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
//         const sortedExpenses = expenses.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         ); // Sort by descending date
//         setData(sortedExpenses);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   const groupByMonth = expenses => {
//     console.log("expenses",expenses)
//     return expenses.reduce((acc, expense) => {
//       const month = new Date(expense.date).toLocaleString('default', {
//         month: 'long',
//         year: 'numeric',
//       });
//       if (!acc[month]) {
//         acc[month] = [];
//       }
//       acc[month].push(expense);
//       return acc;
//     }, {});
//   };

//   const groupedExpenses = groupByMonth(data);

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

//     return (
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
//         {Object.entries(groupedExpenses).map(([month, expenses]) => {
//           // Calculate the total for the current month
//           const totalMonthExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    
//           return (
//             <div key={month} className="mb-8">
//               <h2 className="text-lg font-bold p-4 bg-gray-100 dark:bg-gray-700">
//                 {month} - Total: ${totalMonthExpense.toFixed(2)}
//               </h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     {table.getHeaderGroups().map(headerGroup => (
//                       <tr key={headerGroup.id} className="border-b dark:border-gray-700">
//                         {headerGroup.headers.map(header => (
//                           <th key={header.id} className="text-left p-4">
//                             {flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                           </th>
//                         ))}
//                       </tr>
//                     ))}
//                   </thead>
//                   <tbody>
//                     {expenses.map(expense => (
//                       <tr
//                         key={expense._id}
//                         className="border-b dark:border-gray-700"
//                       >
//                         <td className="p-4">
//                           {new Date(expense.date).toLocaleDateString()}
//                         </td>
//                         <td className="p-4">{expense.category}</td>
//                         <td className="p-4">${expense.amount.toFixed(2)}</td>
//                         <td className="p-4">{expense.notes}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       // {editingExpense && (
//       //   <EditExpenseModal
//       //     expense={editingExpense}
//       //     onClose={() => setEditingExpense(null)}
//       //     onSave={handleEdit}
//       //   />
//       // )}

//       // {deletingExpense && (
//       //   <DeleteConfirmationModal
//       //     expense={deletingExpense}
//       //     onClose={() => setDeletingExpense(null)}
//       //     onConfirm={handleDelete}
//       //   />
//       // )}
//     );
    
// }

import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast'; // Assuming you're using `react-toastify`
import EditExpenseModal from './EditExpenseModel';
import DeleteConfirmationModal from './DeleteConfirmationModel';

const columnHelper = createColumnHelper();

const ExpenseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();
        console.log("expenses",expenses)
        const sortedExpenses = expenses.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setData(sortedExpenses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // const handleDelete = (expense) => {
  //   setData((current) => current.filter((item) => item.id !== expense.id));
  //   toast.success('Expense deleted successfully');
  //   setDeletingExpense(null);
  // };

  const handleDelete = async (expense) => {
    const token = localStorage.getItem('token');
    console.log("expense5",expense)
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${expense._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
  
      toast.success('Expense deleted successfully');
      setDeletingExpense(null);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  // const handleEdit = (updatedExpense) => {
  //   // setData((current) =>
  //   //   current.map((item) =>
  //   //     item.id === updatedExpense.id ? updatedExpense : item
  //   //   )
  //   // );
  //   console.log("expenseid",updatedExpense)
  //   toast.success('Expense updated successfully');
  //   setEditingExpense(null);
  // };

  const handleEdit = async (updatedExpense) => {
    const token = localStorage.getItem('token');
    console.log("updatedExpense",updatedExpense)

    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${updatedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update expense');
      }
  
      // const updatedData = await response.json();
      // setData((current) =>
      //   current.map((item) => (item.id === updatedData.id ? updatedData : item))
      // );
  
      toast.success('Expense updated successfully');
      setEditingExpense(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const groupByMonth = (expenses) => {
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
    columns: [
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      }),
      columnHelper.accessor('notes', {
        header: 'Notes',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => setEditingExpense(row.original)}
              className="p-1 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              aria-label="Edit expense"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeletingExpense(row.original)}
              className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              aria-label="Delete expense"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {Object.entries(groupedExpenses).map(([month, expenses]) => {
        const totalMonthExpense = expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        console.log("expenses1",expenses)

        return (
          <div key={month} className="mb-8">
            <h2 className="text-lg font-bold p-4 bg-gray-100 dark:bg-gray-700">
              {month} - Total: ${totalMonthExpense.toFixed(2)}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b dark:border-gray-700"
                    >
                      {headerGroup.headers.map((header) => (
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
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    {table.getRowModel().rows
                      .find((row) => row.original === expense)
                      ?.getVisibleCells()
                      .map((cell) => (
                        <td key={cell.id} className="p-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleEdit}
        />
      )}

      {deletingExpense && (
        <DeleteConfirmationModal
          expense={deletingExpense}
          onClose={() => setDeletingExpense(null)}
          onConfirm={() => handleDelete(deletingExpense)}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
