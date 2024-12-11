import { useEffect } from 'react'
import NavLinks from './NavLinks'

export default function Sidebar({ isOpen }) {
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <NavLinks />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <aside className="relative w-64 h-full max-w-xs bg-white dark:bg-gray-800 pt-20 pb-4 px-4">
          <NavLinks isMobile />
        </aside>
      </div>
    </>
  )
}