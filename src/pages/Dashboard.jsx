// import { useState } from 'react'
// import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
// import { Line, Pie } from 'react-chartjs-2'
// import ExpenseStats from '../components/ExpenseStats'
// import RecentExpenses from '../components/RecentExpenses'
// import BudgetManager from '../components/BudgetManager'


// ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// const monthlyData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [{
//     label: 'Monthly Expenses',
//     data: [650, 590, 800, 810, 560, 550],
//     borderColor: 'rgb(2, 132, 199)',
//     tension: 0.1
//   }]
// }

// const categoryData = {
//   labels: ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'],
//   datasets: [{
//     data: [300, 150, 100, 200, 250],
//     backgroundColor: [
//       'rgb(2, 132, 199)',
//       'rgb(14, 165, 233)',
//       'rgb(56, 189, 248)',
//       'rgb(186, 230, 253)',
//       'rgb(224, 242, 254)',
//     ]
//   }]
// }

// export default function Dashboard() {
//   const [timeframe, setTimeframe] = useState('month')

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <select 
//           value={timeframe} 
//           onChange={(e) => setTimeframe(e.target.value)}
//           className="input max-w-xs"
//         >
//           <option value="week">This Week</option>
//           <option value="month">This Month</option>
//           <option value="year">This Year</option>
//         </select>
//       </div>

//       <BudgetManager/>

//       <ExpenseStats />

//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
//           <Line data={monthlyData} options={{ responsive: true }} />
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
//           <Pie data={categoryData} options={{ responsive: true }} />
//         </div>
//       </div>

//       <RecentExpenses />
//     </div>
//   )
// }

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import ExpenseStats from '../components/ExpenseStats';
import RecentExpenses from '../components/RecentExpenses';
import BudgetManager from '../components/BudgetManager';
import BudgetOverviewSlider from '../components/BudgetOverviewSlider';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('month');
  const [monthlyData, setMonthlyData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
        console.log('token', token)
        const response = await fetch(`http://localhost:5000/api/expenses/dashboard?timeframe=${timeframe}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const data = await response.json();
        console.log("data", data)
        // Assume backend sends data in the following structure:
        // { monthlyTrend: { labels: [...], data: [...] }, categoryBreakdown: { labels: [...], data: [...] } }
        setMonthlyData({
          labels: data.monthlyTrend.labels,
          datasets: [
            {
              label: 'Monthly Expenses',
              data: data.monthlyTrend.data,
              borderColor: 'rgb(2, 132, 199)',
              tension: 0.1,
            },
          ],
        });

        setCategoryData({
          labels: data.categoryBreakdown.labels,
          datasets: [
            {
              data: data.categoryBreakdown.data,
              backgroundColor: [
                'rgb(2, 132, 199)',
                'rgb(14, 165, 233)',
                'rgb(56, 189, 248)',
                'rgb(186, 230, 253)',
                'rgb(224, 242, 254)',
              ],
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [timeframe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="input max-w-xs"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <BudgetManager />

      <BudgetOverviewSlider />

      {/* <ExpenseStats /> */}
      {(monthlyData && Object.keys(monthlyData).length > 0) ||
        (categoryData && Object.keys(categoryData).length > 0) ? (
        <div className="grid md:grid-cols-2 gap-6">
          {monthlyData && Object.keys(monthlyData).length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
              <Line data={monthlyData} options={{ responsive: true }} />
            </div>
          )}
          {categoryData && Object.keys(categoryData).length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
              <Pie data={categoryData} options={{ responsive: true }} />
            </div>
          )}
        </div>
      ) : (""
        // <p className="text-gray-500 dark:text-gray-400 text-center">
        //   No data available to display.
        // </p>
      )}

      <RecentExpenses />
    </div>
  );
}
