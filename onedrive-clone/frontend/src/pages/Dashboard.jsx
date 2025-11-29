import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import FilesView from '../components/FilesView'
import FavoritesView from '../components/FavoritesView'
import TrashView from '../components/TrashView'
import Profile from './Profile'
import { filesAPI } from '../api/files'
import { foldersAPI } from '../api/folders'

export default function Dashboard() {
  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [currentFolderId, setCurrentFolderId] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(false)
  const [searchResults, setSearchResults] = useState(null)

  const loadData = async (folderId) => {
    setLoading(true)
    setSearchResults(null)
    try {
      const [filesData, foldersData] = await Promise.all([
        filesAPI.getFiles(folderId),
        foldersAPI.getFolders(folderId),
      ])
      setFiles(filesData)
      setFolders(foldersData)
      setCurrentFolderId(folderId)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  useEffect(() => {
    loadData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = async (file) => {
    setUploadProgress(true)
    try {
      await filesAPI.uploadFile(file, currentFolderId)
      await loadData(currentFolderId)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload file')
    } finally {
      setUploadProgress(false)
    }
  }

  const handleCreateFolder = async (name) => {
    try {
      await foldersAPI.createFolder(name, currentFolderId)
      await loadData(currentFolderId)
    } catch (error) {
      console.error('Failed to create folder:', error)
      alert('Failed to create folder')
    }
  }

  const handleDeleteFile = async (fileId) => {
    try {
      await filesAPI.deleteFile(fileId)
      await loadData(currentFolderId)
    } catch (error) {
      console.error('Failed to delete file:', error)
      alert('Failed to delete file')
    }
  }

  const handleDeleteFolder = async (folderId) => {
    try {
      await foldersAPI.deleteFolder(folderId)
      await loadData(currentFolderId)
    } catch (error) {
      console.error('Failed to delete folder:', error)
      alert('Failed to delete folder')
    }
  }

  const handleToggleFavorite = async (fileId) => {
    try {
      await filesAPI.toggleFavorite(fileId)
      await loadData(currentFolderId)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  const handleDownload = async (fileId, fileName) => {
    try {
      const blob = await filesAPI.downloadFile(fileId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to download file:', error)
      alert('Failed to download file')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onUpload={handleUpload}
          onCreateFolder={handleCreateFolder}
          uploadProgress={uploadProgress}
          onSearchResults={handleSearchResults}
        />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <FilesView
                  files={searchResults ? searchResults.files : files}
                  folders={searchResults ? searchResults.folders : folders}
                  loading={loading}
                  onFolderClick={loadData}
                  onDeleteFile={handleDeleteFile}
                  onDeleteFolder={handleDeleteFolder}
                  onToggleFavorite={handleToggleFavorite}
                  onDownload={handleDownload}
                  onRefresh={() => loadData(currentFolderId)}
                  onUpload={handleUpload}
                  currentFolderId={currentFolderId}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesView
                  onDeleteFile={handleDeleteFile}
                />
              }
            />
            <Route path="/trash" element={<TrashView />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
