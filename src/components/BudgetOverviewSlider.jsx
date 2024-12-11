
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { default as jwtDecode } from 'jwt-decode';
import { useBudget } from '../hooks/useBudget';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function BudgetOverviewSlider() {
  const { budget } = useBudget();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [income, setIncome] = useState(5000); // Mocked income value

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
        const response = await fetch('http://localhost:5000/api/expenses/monthly', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        setMonthlyExpenses(data);
      } catch (err) {
        console.error('Error fetching expenses:', err.message);
      }
    };

    fetchExpenses();
  }, []);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const { createdAt } = decodedToken;

  // const createdDate = new Date(createdAt); // Use actual decoded token value
  const createdDate = new Date("Fri Nov 06 2024 11:41:22 GMT+0530 (India Standard Time)");

  const currentDate = new Date();

  const startMonth = createdDate.getMonth();
  const startYear = createdDate.getFullYear();
  const endMonth = currentDate.getMonth();
  const endYear = currentDate.getFullYear();

  // Generate months between the created date and the current date
  const monthsBetween = [];
  let year = startYear;
  let month = startMonth;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    monthsBetween.push(`${months[month]} ${year}`);
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  // Reverse the months to show the latest first
  const reversedMonths = monthsBetween.reverse();

  const getMonthData = (monthIndex) => {
    const currentMonth = reversedMonths[monthIndex];
    const expenseData = monthlyExpenses.find(
      (item) => item.month === currentMonth
    );

    const expense = expenseData ? expenseData.expense : 0;
    const defaultIncome = income || 0;
    const defaultBudget = budget || 0;

    const [monthName, year] = currentMonth.split(' ');
    const month = months.indexOf(monthName);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Check if this is the current month
    const isCurrentMonth =
      currentDate.getFullYear() === parseInt(year, 10) &&
      currentDate.getMonth() === month;

    const daysElapsed = isCurrentMonth ? currentDate.getDate() : daysInMonth;

    // Calculate the average expense
    const averageExpense = expense / daysElapsed;

    return {
      income: defaultIncome,
      budget: defaultBudget,
      expenses: expense,
      savings: defaultBudget - expense,
      averageExpense,
    };
  };

  const currentMonthData = getMonthData(currentMonthIndex);

  const navigateMonth = (direction) => {
    setCurrentMonthIndex((prev) => {
      if (direction === 'next') {
        return prev === reversedMonths.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? reversedMonths.length - 1 : prev - 1;
    });
  };

  return (
    <>
      {monthlyExpenses.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold">
              {reversedMonths[currentMonthIndex]}
            </h2>

            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next month"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
              <p className="text-xl font-semibold">${budget || '0.00'}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
              <p className="text-xl font-semibold">
                ${currentMonthData.expenses?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Savings</p>
              <p className="text-xl font-semibold">
                ${currentMonthData.savings?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average Expense
              </p>
              <p className="text-xl font-semibold">
                ${currentMonthData.averageExpense.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Usage</span>
                <span>
                  {(
                    (currentMonthData.expenses / currentMonthData.budget) *
                    100
                  ).toFixed(1) || '0.0'}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`h-2.5 rounded-full ${
                    currentMonthData.expenses > currentMonthData.budget
                      ? 'bg-red-600'
                      : 'bg-primary-600'
                  }`}
                  style={{
                    width: `${Math.min(
                      (currentMonthData.expenses / currentMonthData.budget) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

