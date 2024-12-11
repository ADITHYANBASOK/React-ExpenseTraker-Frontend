import { NavLink } from 'react-router-dom'
import { HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const links = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Expenses', to: '/expenses', icon: CurrencyDollarIcon },
]

export default function NavLinks({ isMobile = false }) {
  const baseClasses = `flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`
  const mobileClasses = `w-full ${baseClasses}`
  const desktopClasses = baseClasses

  return (
    <nav className={isMobile ? 'space-y-1' : 'space-y-2'}>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className={({ isActive }) =>
            `${isMobile ? mobileClasses : desktopClasses} ${
              isActive
                ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                : ''
            }`
          }
        >
          <link.icon className="h-5 w-5 mr-2" />
          {link.name}
        </NavLink>
      ))}
    </nav>
  )
}