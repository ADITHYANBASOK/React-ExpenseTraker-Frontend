
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navigation/Navbar'
import Sidebar from './navigation/Sidebar'

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen">
      <Navbar
        onMobileMenuToggle={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <Sidebar isOpen={isMobileMenuOpen} />
      <main className="lg:pl-64 pt-16">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}