import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { useTheme } from './hooks/useTheme'
// import { useTheme } from './hooks/useTheme'


function App() {
  // const { theme } = useTheme()

  // useEffect(() => {
  //   console.log("app.js",theme)
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [theme])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
      </Route>
    </Routes>
  )
}

export default App