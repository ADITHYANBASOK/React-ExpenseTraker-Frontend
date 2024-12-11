import { useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import MobileMenuButton from './MobileMenuButton'

export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={onMobileMenuToggle}
            />
            <h1 className="text-xl font-bold text-primary-600 ml-2 lg:ml-0">
              ExpenseTracker
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}