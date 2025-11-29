import { useState, useRef } from 'react'
import { Upload, FolderPlus, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { filesAPI } from '../api/files'
import { foldersAPI } from '../api/folders'

export default function Header({ onUpload, onCreateFolder, uploadProgress, onSearchResults }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showFolderModal, setShowFolderModal] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      onCreateFolder(folderName.trim())
      setFolderName('')
      setShowFolderModal(false)
    }
  }

  const handleSearch = async (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim().length < 2) {
      if (onSearchResults) {
        onSearchResults(null)
      }
      return
    }
    
    setSearching(true)
    try {
      const [files, folders] = await Promise.all([
        filesAPI.searchFiles(query),
        foldersAPI.searchFolders(query)
      ])
      if (onSearchResults) {
        onSearchResults({ files, folders })
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setSearching(false)
    }
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files and folders..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              />
              {searching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" style={{ borderColor: '#45ADA8', borderTopColor: 'transparent' }}></div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-6">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadProgress}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#45ADA8' }}
              onMouseEnter={(e) => !uploadProgress && (e.target.style.backgroundColor = '#547980')}
              onMouseLeave={(e) => !uploadProgress && (e.target.style.backgroundColor = '#45ADA8')}
            >
              <Upload className="h-5 w-5" />
              <span>{uploadProgress ? 'Uploading...' : 'Upload'}</span>
            </button>

            <button
              onClick={() => setShowFolderModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FolderPlus className="h-5 w-5" />
              <span>New Folder</span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E5FCC2' }}>
                  {user?.profilePicture ? (
                    <img
                      src={`/api/profiles/${user.profilePicture}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" style={{ color: '#45ADA8' }} />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-200">
                    <div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/dashboard/profile')
                        setShowProfileMenu(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        logout()
                        navigate('/')
                        setShowProfileMenu(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Folder</h3>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowFolderModal(false)
                  setFolderName('')
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!folderName.trim()}
                className="px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#45ADA8' }}
                onMouseEnter={(e) => !folderName.trim() || (e.target.style.backgroundColor = '#547980')}
                onMouseLeave={(e) => !folderName.trim() || (e.target.style.backgroundColor = '#45ADA8')}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
