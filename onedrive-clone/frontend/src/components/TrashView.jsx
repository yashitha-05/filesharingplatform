import { useState, useEffect } from 'react'
import { filesAPI } from '../api/files'
import { File, RotateCcw, Trash2, MoreVertical } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function TrashView({ onReload }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState(null)

  useEffect(() => {
    loadTrashedFiles()
  }, [])

  const loadTrashedFiles = async () => {
    try {
      const data = await filesAPI.getTrashedFiles()
      setFiles(data)
    } catch (error) {
      console.error('Failed to load trashed files:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleRestore = async (fileId) => {
    try {
      await filesAPI.restoreFile(fileId)
      await loadTrashedFiles()
      onReload()
    } catch (error) {
      console.error('Failed to restore file:', error)
      alert('Failed to restore file')
    }
  }

  const handlePermanentDelete = async (fileId) => {
    if (confirm('Are you sure you want to permanently delete this file? This action cannot be undone.')) {
      try {
        await filesAPI.permanentlyDeleteFile(fileId)
        await loadTrashedFiles()
      } catch (error) {
        console.error('Failed to delete file:', error)
        alert('Failed to delete file')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Trash2 className="h-16 w-16 mb-4 text-gray-300" />
        <p className="text-lg">Trash is empty</p>
        <p className="text-sm">Deleted files will appear here</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Trash</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Deleted</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-gray-200">
          {files.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
            >
              <div className="col-span-6 flex items-center space-x-3">
                <File className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{file.name}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-500">{formatFileSize(file.size)}</div>
              <div className="col-span-3 text-sm text-gray-500">
                {file.trashedAt && formatDistanceToNow(new Date(file.trashedAt), { addSuffix: true })}
              </div>
              <div className="col-span-1 flex justify-end relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === file.id ? null : file.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="More options"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
                {activeMenu === file.id && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 w-48">
                    <button
                      onClick={() => {
                        handleRestore(file.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Restore</span>
                    </button>
                    <button
                      onClick={() => {
                        handlePermanentDelete(file.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete permanently</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
