import React, { useEffect, useState } from 'react';

export default function RecentExpenses() {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentExpenses = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('https://node-expense-traker-backend.vercel.app/api/expenses?limit=3&sort=-date', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();
        setRecentExpenses(expenses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentExpenses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b dark:border-gray-700">
                <th className="pb-3">Date</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((expense) => (
                <tr key={expense.id} className="border-b dark:border-gray-700">
                  <td className="py-3">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="py-3">{expense.category}</td>
                  <td className="py-3">${expense.amount.toFixed(2)}</td>
                  <td className="py-3">{expense.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
