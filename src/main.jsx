import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
// import { AuthProvider } from './hooks/useAuth'
import App from './App'
import './index.css'
import { AuthProvider } from './hooks/useAuth'
import { BudgetProvider } from './hooks/useBudget'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BudgetProvider>
          <App />
          <Toaster position="top-right" />
          </BudgetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)