export default function ExpenseStats() {
  const stats = [
    { label: 'Total Expenses', value: '$2,500.00' },
    { label: 'Average Daily', value: '$83.33' },
    { label: 'Highest Expense', value: '$350.00' },
    { label: 'Budget Left', value: '$500.00' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          <p className="text-2xl font-semibold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}