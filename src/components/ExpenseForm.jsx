import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useExpenseContext } from '../context/ExpenseContext'


const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Others',
]

export default function ExpenseForm({ onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { refreshExpenses } = useExpenseContext();


  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://node-expense-traker-backend.vercel.app/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); 
        toast.success('Expense added successfully');
        refreshExpenses();
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          id="amount"
          className="input"
          {...register('amount', { required: 'Amount is required' })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          className="input"
          {...register('category', { required: 'Category is required' })}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="input"
          {...register('date', { required: 'Date is required' })}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          className="input"
          rows="3"
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Expense
        </button>
      </div>
    </form>
  )
}