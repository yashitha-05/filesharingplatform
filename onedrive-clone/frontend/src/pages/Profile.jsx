import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { User, Mail, Phone, Camera, Moon, Sun, Save } from 'lucide-react'
import api from '../api/axios'

export default function Profile() {
  const { user, setUser } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
  })
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await api.put('/users/profile', formData)
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await api.post('/users/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      alert('Profile picture updated!')
    } catch (error) {
      console.error('Failed to upload profile picture:', error)
      alert('Failed to upload profile picture')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#594F4F' }}>Profile Settings</h1>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E5FCC2' }}>
              {user?.profilePicture ? (
                <img
                  src={`/api/profiles/${user.profilePicture}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12" style={{ color: '#45ADA8' }} />
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 rounded-full text-white"
              style={{ backgroundColor: '#45ADA8' }}
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#547980' }}>
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100"
                style={{ focusRing: '#45ADA8' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline h-4 w-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              disabled={!editing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent disabled:bg-gray-100"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="flex justify-end space-x-4">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 text-white rounded-lg flex items-center space-x-2"
                  style={{ backgroundColor: '#45ADA8' }}
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-6 py-2 text-white rounded-lg"
                style={{ backgroundColor: '#45ADA8' }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Theme Toggle */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-bold mb-4" style={{ color: '#594F4F' }}>Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Dark Mode</p>
            <p className="text-sm text-gray-600">Toggle between light and dark theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className="relative inline-flex h-12 w-24 items-center rounded-full transition-colors"
            style={{ backgroundColor: isDarkMode ? '#45ADA8' : '#E5FCC2' }}
          >
            <span
              className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-12' : 'translate-x-1'
              }`}
            >
              {isDarkMode ? (
                <Moon className="h-6 w-6 m-2" style={{ color: '#45ADA8' }} />
              ) : (
                <Sun className="h-6 w-6 m-2" style={{ color: '#547980' }} />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
