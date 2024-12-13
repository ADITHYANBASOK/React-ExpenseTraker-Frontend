

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
import { useExpenseContext } from '../context/ExpenseContext';


const columnHelper = createColumnHelper();

const ExpenseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const { refreshExpenses } = useExpenseContext();


  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://node-expense-traker-backend.vercel.app/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const expenses = await response.json();
      console.log("expenses", expenses)
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



  useEffect(() => {
    // Fetch initially
    fetchExpenses();

    // Listen for refresh event
    const handleRefresh = () => {
      fetchExpenses();
    };
    window.addEventListener('refreshExpenses', handleRefresh);

    // Cleanup listener
    return () => {
      window.removeEventListener('refreshExpenses', handleRefresh);
    };
  }, []);



  const handleDelete = async (expense) => {
    const token = localStorage.getItem('token');
    console.log("expense5", expense)
    try {
      const response = await fetch(`https://node-expense-traker-backend.vercel.app/api/expenses/${expense._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      toast.success('Expense deleted successfully');
      refreshExpenses();

      setDeletingExpense(null);
    } catch (error) {
      toast.error(error.message);
    }
  };




  const handleEdit = async (updatedExpense) => {
    const token = localStorage.getItem('token');
    console.log("updatedExpense", updatedExpense)

    try {
      const response = await fetch(`https://node-expense-traker-backend.vercel.app/api/expenses/${updatedExpense._id}`, {
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


      toast.success('Expense updated successfully');

      setEditingExpense(null);
      refreshExpenses();

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
  {Object.keys(groupedExpenses).length > 0 ? (
    Object.entries(groupedExpenses).map(([month, expenses]) => {
      const totalMonthExpense = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );

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
    })
  ) : (
    <div className="text-center p-8">
      <p className="text-gray-500 dark:text-gray-400">
        No data found.
      </p>
    </div>
  )}

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
