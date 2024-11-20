import { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = async (email, password) => {
    try {
      // Simulate API call
      if (email === 'demo@example.com' && password === 'password') {
        const user = { id: 1, email }
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        return true
      }
      throw new Error('Invalid credentials')
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  const register = async (email, password) => {
    try {
      // Simulate API call
      const user = { id: 1, email }
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return true
    } catch (error) {
      toast.error(error.message)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}