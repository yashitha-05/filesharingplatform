import { Folder as FolderIcon, File, Download, Trash2, Star, MoreVertical, Eye, Edit2, FolderInput, CheckSquare, Square, Upload } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { filesAPI } from '../api/files'

export default function FilesView({
  files,
  folders,
  loading,
  onFolderClick,
  onDeleteFile,
  onDeleteFolder,
  onToggleFavorite,
  onDownload,
  onRefresh,
  onUpload,
}) {
  const [activeMenu, setActiveMenu] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewFile, setPreviewFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [renameFileId, setRenameFileId] = useState(null)
  const [newFileName, setNewFileName] = useState('')
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [targetFolderId, setTargetFolderId] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handlePreview = async (file) => {
    try {
      const blob = await filesAPI.previewFile(file.id)
      const url = window.URL.createObjectURL(blob)
      setPreviewUrl(url)
      setPreviewFile(file)
      setShowPreview(true)
    } catch (error) {
      console.error('Preview failed:', error)
      alert('Cannot preview this file type')
    }
  }

  const closePreview = () => {
    if (previewUrl) {
      window.URL.revokeObjectURL(previewUrl)
    }
    setShowPreview(false)
    setPreviewFile(null)
    setPreviewUrl(null)
  }

  const handleRename = async (fileId) => {
    if (!newFileName.trim()) return
    try {
      await filesAPI.renameFile(fileId, newFileName.trim())
      setRenameFileId(null)
      setNewFileName('')
      if (onRefresh) onRefresh()
    } catch (error) {
      console.error('Rename failed:', error)
      alert('Failed to rename file')
    }
  }

  const toggleFileSelection = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleBulkMove = async () => {
    if (selectedFiles.length === 0) return
    try {
      await filesAPI.moveMultipleFiles(selectedFiles, targetFolderId)
      setSelectedFiles([])
      setShowMoveModal(false)
      setTargetFolderId(null)
      if (onRefresh) onRefresh()
    } catch (error) {
      console.error('Move failed:', error)
      alert('Failed to move files')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (folders.length === 0 && files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <FolderIcon className="h-16 w-16 mb-4 text-gray-300" />
        <p className="text-lg">No files or folders yet</p>
        <p className="text-sm">Upload a file or create a folder to get started</p>
      </div>
    )
  }

  return (
    <div 
      className="p-6 relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-lg p-8 text-center" style={{ borderColor: '#45ADA8', borderWidth: '3px', borderStyle: 'dashed' }}>
            <Upload className="h-16 w-16 mx-auto mb-4" style={{ color: '#45ADA8' }} />
            <p className="text-2xl font-bold" style={{ color: '#547980' }}>Drop files here to upload</p>
          </div>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="mb-4 rounded-lg p-4 flex items-center justify-between" style={{ backgroundColor: '#E5FCC2', borderColor: '#9DE0AD', borderWidth: '1px' }}>
          <span style={{ color: '#547980' }}>{selectedFiles.length} file(s) selected</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowMoveModal(true)}
              className="px-4 py-2 text-white rounded-lg flex items-center space-x-2"
              style={{ backgroundColor: '#45ADA8' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#547980'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#45ADA8'}
            >
              <FolderInput className="h-4 w-4" />
              <span>Move to Folder</span>
            </button>
            <button
              onClick={() => setSelectedFiles([])}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div className="col-span-1"></div>
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Modified</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y divide-gray-200">
          {folders.map((folder) => (
            <div
              key={`folder-${folder.id}`}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
            >
              <div className="col-span-1"></div>
              <div
                className="col-span-5 flex items-center space-x-3 cursor-pointer"
                onClick={() => onFolderClick(folder.id)}
              >
                <FolderIcon className="h-5 w-5 text-blue-500" />
                <span className="text-gray-900 font-medium">{folder.name}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-500">—</div>
              <div className="col-span-3 text-sm text-gray-500">
                {formatDistanceToNow(new Date(folder.updatedAt), { addSuffix: true })}
              </div>
              <div className="col-span-1 flex justify-end relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === `folder-${folder.id}` ? null : `folder-${folder.id}`)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="More options"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
                {activeMenu === `folder-${folder.id}` && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 w-48">
                    <button
                      onClick={() => {
                        onDeleteFolder(folder.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {files.map((file) => (
            <div
              key={`file-${file.id}`}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
            >
              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => toggleFileSelection(file.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  {selectedFiles.includes(file.id) ? (
                    <CheckSquare className="h-5 w-5" style={{ color: '#45ADA8' }} />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="col-span-5 flex items-center space-x-3">
                <File className="h-5 w-5 text-gray-400" />
                {renameFileId === file.id ? (
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onBlur={() => handleRename(file.id)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRename(file.id)}
                    className="px-2 py-1 border rounded focus:outline-none focus:ring-2"
                    style={{ borderColor: '#45ADA8' }}
                    autoFocus
                  />
                ) : (
                  <span className="text-gray-900">{file.name}</span>
                )}
              </div>
              <div className="col-span-2 text-sm text-gray-500">{formatFileSize(file.size)}</div>
              <div className="col-span-3 text-sm text-gray-500">
                {formatDistanceToNow(new Date(file.updatedAt), { addSuffix: true })}
              </div>
              <div className="col-span-1 flex justify-end relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === `file-${file.id}` ? null : `file-${file.id}`)}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="More options"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
                {activeMenu === `file-${file.id}` && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 w-48">
                    <button
                      onClick={() => {
                        handlePreview(file)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => {
                        onDownload(file.id, file.name)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => {
                        setRenameFileId(file.id)
                        setNewFileName(file.name)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Rename</span>
                    </button>
                    <button
                      onClick={() => {
                        onToggleFavorite(file.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Star className={`h-4 w-4 ${file.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      <span>{file.isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
                    </button>
                    <button
                      onClick={() => {
                        onDeleteFile(file.id)
                        setActiveMenu(null)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Move to trash</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closePreview}>
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewFile.name}</h3>
              <button onClick={closePreview} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-8rem)]">
              {previewFile.mimeType?.startsWith('image/') ? (
                <img src={previewUrl} alt={previewFile.name} className="max-w-full h-auto" />
              ) : previewFile.mimeType?.startsWith('video/') ? (
                <video src={previewUrl} controls className="max-w-full h-auto" />
              ) : previewFile.mimeType?.startsWith('audio/') ? (
                <audio src={previewUrl} controls className="w-full" />
              ) : previewFile.mimeType === 'application/pdf' ? (
                <iframe src={previewUrl} className="w-full h-[70vh]" title={previewFile.name} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Preview not available for this file type</p>
                  <button
                    onClick={() => onDownload(previewFile.id, previewFile.name)}
                    className="mt-4 px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#45ADA8' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#547980'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#45ADA8'}
                  >
                    Download to view
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Move Modal */}
      {showMoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Move Files to Folder</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select destination folder:</label>
              <select
                value={targetFolderId || ''}
                onChange={(e) => setTargetFolderId(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Root (No folder)</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowMoveModal(false)
                  setTargetFolderId(null)
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkMove}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: '#45ADA8' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#547980'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#45ADA8'}
              >
                Move Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
