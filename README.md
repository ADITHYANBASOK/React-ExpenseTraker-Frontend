# ExpenseTracker

A modern expense tracking application built with React and Vite, featuring a responsive design, dark mode support, and comprehensive expense management capabilities.

## Features

- 💰 Expense Management
  - Add, edit, and delete expenses
  - Categorize expenses
  - Track spending patterns
  - Set budgets and receive alerts

- 📊 Dashboard Analytics
  - Monthly expense trends
  - Category-wise breakdown
  - Budget vs. actual spending
  - Savings rate calculation

- 🎨 Modern UI/UX
  - Responsive design
  - Dark/Light theme
  - Mobile-first approach
  - Smooth transitions

- 🔒 Authentication
  - User registration
  - Secure login
  - Protected routes

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── navigation/      # Navigation-related components
│   │   ├── MobileMenuButton.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavLinks.jsx
│   │   └── Sidebar.jsx
│   ├── BudgetManager.jsx
│   ├── DeleteConfirmationModal.jsx
│   ├── EditExpenseModal.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseStats.jsx
│   ├── ExpenseTable.jsx
│   ├── Layout.jsx
│   ├── ProtectedRoute.jsx
│   └── RecentExpenses.jsx
│
├── hooks/               # Custom React hooks
│   ├── useAuth.jsx     # Authentication logic
│   ├── useBudget.jsx   # Budget management
│   └── useTheme.jsx    # Theme switching
│
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Expenses.jsx    # Expense management
│   ├── Login.jsx       # User login
│   └── Register.jsx    # User registration
│
├── App.jsx             # Root component
├── main.jsx           # Application entry
└── index.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Form Handling**: React Hook Form
- **Data Visualization**: Chart.js
- **Routing**: React Router
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## Code Organization

### Components
- Each component is focused on a single responsibility
- Reusable components are kept in the components directory
- Complex components are broken down into smaller, manageable pieces

### Hooks
- Custom hooks extract and share common logic
- Each hook serves a specific purpose (auth, theme, budget)
- Hooks follow the React hooks naming convention

### Pages
- Page components represent different routes
- Each page component focuses on layout and composition
- Business logic is delegated to custom hooks

