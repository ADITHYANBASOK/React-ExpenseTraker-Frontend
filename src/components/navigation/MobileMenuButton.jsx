import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <XMarkIcon className="h-6 w-6" />
      ) : (
        <Bars3Icon className="h-6 w-6" />
      )}
    </button>
  )
}