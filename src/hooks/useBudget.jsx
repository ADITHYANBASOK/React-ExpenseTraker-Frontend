import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0); 

    const fetchBudgetAndExpenses = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch budget
          const budgetResponse = await fetch('https://node-expense-traker-backend.vercel.app/api/budget', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const budgetData = await budgetResponse.json();
          setBudget(budgetData.amount || 0);

          // Fetch expenses
          const expensesResponse = await fetch('https://node-expense-traker-backend.vercel.app/api/expenses/currentMonth', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const expensesData = await expensesResponse.json();
          console.log("expensesData",expensesData)
          
          // Calculate total expenses
          const total = expensesData.reduce((acc, expense) => acc + expense.amount, 0);
          setTotalExpenses(total);
        } catch (error) {
          toast.error('Failed to fetch budget or expenses');
        }
      }
    };
  

  useEffect(() => {
    // Fetch initially
    fetchBudgetAndExpenses();

    // Listen for refresh event
    const handleRefresh = () => {
      fetchBudgetAndExpenses();
    };
    window.addEventListener('refreshExpenses', handleRefresh);

    // Cleanup listener
    return () => {
      window.removeEventListener('refreshExpenses', handleRefresh);
    };
  }, []);


  const updateBudget = async (newBudget) => {
    try {
      const response = await fetch('https://node-expense-traker-backend.vercel.app/api/budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ amount: newBudget }),
      });
      const data = await response.json();
      setBudget(data.amount);
      toast.success('Budget updated successfully');
    } catch (error) {
      toast.error('Failed to update budget');
    }
  };

  return (
    <BudgetContext.Provider value={{ budget, updateBudget, totalExpenses }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
