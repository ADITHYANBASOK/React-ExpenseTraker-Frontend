import React, { createContext, useContext, useCallback } from 'react';

// Create the context
const ExpenseContext = createContext();

// Context Provider
export const ExpenseProvider = ({ children }) => {
  // Callback function to trigger refresh
  const refreshExpenses = useCallback(() => {
    // Notify components to fetch new data
    const event = new Event('refreshExpenses');
    window.dispatchEvent(event);
  }, []);

  return (
    <ExpenseContext.Provider value={{ refreshExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom Hook for easier access
export const useExpenseContext = () => useContext(ExpenseContext);