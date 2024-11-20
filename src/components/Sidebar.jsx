import { NavLink } from 'react-router-dom'
import { HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Expenses', to: '/expenses', icon: CurrencyDollarIcon },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
      <nav className="mt-5 px-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}