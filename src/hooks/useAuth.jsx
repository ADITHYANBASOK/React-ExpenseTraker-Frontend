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
      const response = await fetch('https://node-expense-traker-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });
      if (response.ok) {
        const data = await response.json();
        const user = { id: data.userId, email: data.email }; 
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('https://node-expense-traker-backend.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser({ id: data.id, email });
        localStorage.setItem('user', JSON.stringify({ id: data.id, email }));
        localStorage.setItem('token', data.token);
        return true;
      }
      throw new Error('Failed to register');
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

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