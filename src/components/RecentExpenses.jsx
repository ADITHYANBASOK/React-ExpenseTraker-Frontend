const recentExpenses = [
  { id: 1, date: '2023-11-01', category: 'Food', amount: 25.50, notes: 'Lunch' },
  { id: 2, date: '2023-11-02', category: 'Transport', amount: 15.00, notes: 'Bus fare' },
  { id: 3, date: '2023-11-03', category: 'Entertainment', amount: 50.00, notes: 'Movie tickets' },
]

export default function RecentExpenses() {
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
                  <td className="py-3">{expense.date}</td>
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
  )
}