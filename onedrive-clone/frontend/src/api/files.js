import api from './axios'

export const filesAPI = {
  uploadFile: async (file, folderId) => {
    const formData = new FormData()
    formData.append('file', file)
    if (folderId) {
      formData.append('folderId', folderId.toString())
    }

    const response = await api.post('/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  getFiles: async (folderId) => {
    const params = folderId ? { folderId } : {}
    const response = await api.get('/files', { params })
    return response.data
  },

  getFile: async (fileId) => {
    const response = await api.get(`/files/${fileId}`)
    return response.data
  },

  downloadFile: async (fileId) => {
    const response = await api.get(`/files/${fileId}/download`, {
      responseType: 'blob',
    })
    return response.data
  },

  deleteFile: async (fileId) => {
    await api.delete(`/files/${fileId}`)
  },

  permanentlyDeleteFile: async (fileId) => {
    await api.delete(`/files/${fileId}/permanent`)
  },

  restoreFile: async (fileId) => {
    const response = await api.post(`/files/${fileId}/restore`)
    return response.data
  },

  toggleFavorite: async (fileId) => {
    const response = await api.post(`/files/${fileId}/favorite`)
    return response.data
  },

  getTrashedFiles: async () => {
    const response = await api.get('/files/trash')
    return response.data
  },

  getFavoriteFiles: async () => {
    const response = await api.get('/files/favorites')
    return response.data
  },

  searchFiles: async (query) => {
    const response = await api.get('/files/search', {
      params: { query },
    })
    return response.data
  },

  renameFile: async (fileId, newName) => {
    const response = await api.put(`/files/${fileId}/rename`, null, {
      params: { newName },
    })
    return response.data
  },

  moveFile: async (fileId, folderId) => {
    const response = await api.put(`/files/${fileId}/move`, null, {
      params: { folderId },
    })
    return response.data
  },

  moveMultipleFiles: async (fileIds, folderId) => {
    const response = await api.post('/files/move-multiple', null, {
      params: { fileIds: fileIds.join(','), folderId },
    })
    return response.data
  },

  previewFile: async (fileId) => {
    const response = await api.get(`/files/${fileId}/preview`, {
      responseType: 'blob',
    })
    return response.data
  },
}
