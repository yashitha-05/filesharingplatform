import { Link, useLocation } from 'react-router-dom'
import { Home, Star, Trash2, Cloud, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import clsx from 'clsx'

export default function Sidebar() {
  const location = useLocation()
  const { logout, user } = useAuth()

  const navigation = [
    { name: 'My Files', href: '/dashboard', icon: Home },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Star },
    { name: 'Trash', href: '/dashboard/trash', icon: Trash2 },
  ]

  const formatStorage = (bytes) => {
    if (bytes === 0) return '0'
    const gb = bytes / (1024 * 1024 * 1024)
    if (gb < 0.01) {
      const mb = bytes / (1024 * 1024)
      return mb.toFixed(2) + ' MB'
    }
    return gb.toFixed(2) + ' GB'
  }
  
  const formatStorageGB = (bytes) => {
    const gb = bytes / (1024 * 1024 * 1024)
    return gb.toFixed(2)
  }

  const storagePercentage = user
    ? (user.storageUsed / user.storageLimit) * 100
    : 0

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Cloud className="h-8 w-8" style={{ color: '#45ADA8' }} />
          <span className="text-xl font-bold" style={{ color: '#547980' }}>ShareHub</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'text-gray-700 hover:bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
              style={isActive ? { backgroundColor: '#E5FCC2', color: '#547980' } : {}}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-4">
        {user && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Storage</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${Math.min(storagePercentage, 100)}%`, backgroundColor: '#45ADA8' }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {formatStorage(user.storageUsed)} of {formatStorageGB(user.storageLimit)} GB used
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
