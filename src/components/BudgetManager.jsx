import { useState } from 'react'
import { useBudget } from '../hooks/useBudget'

export default function BudgetManager() {
  const { budget, updateBudget, totalExpenses } = useBudget()
  const [isEditing, setIsEditing] = useState(false)
  const [newBudget, setNewBudget] = useState(budget)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateBudget(newBudget)
    setIsEditing(false)
  }

  const remainingBudget = budget - totalExpenses
  const progress = budget > 0 ? (totalExpenses / budget) * 100 : 0

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Budget Overview</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-primary-600 hover:text-primary-700"
        >
          {isEditing ? 'Cancel' : 'Edit Budget'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium mb-1">
              Monthly Budget
            </label>
            <input
              type="number"
              id="budget"
              min="0"
              step="0.01"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Budget
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
              <p className="text-xl font-semibold">${budget.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
              <p className="text-xl font-semibold">${totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
              <p className={`text-xl font-semibold ${remainingBudget < 0 ? 'text-red-500' : ''}`}>
                ${remainingBudget.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Usage</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-2.5 rounded-full ${
                  progress >= 100 ? 'bg-red-600' : 'bg-primary-600'
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}