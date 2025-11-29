import api from './axios'

export const foldersAPI = {
  createFolder: async (name, parentId) => {
    const response = await api.post('/folders', { name, parentId })
    return response.data
  },

  getFolders: async (parentId) => {
    const params = parentId ? { parentId } : {}
    const response = await api.get('/folders', { params })
    return response.data
  },

  getFolder: async (folderId) => {
    const response = await api.get(`/folders/${folderId}`)
    return response.data
  },

  updateFolder: async (folderId, name) => {
    const response = await api.put(`/folders/${folderId}`, { name })
    return response.data
  },

  deleteFolder: async (folderId) => {
    await api.delete(`/folders/${folderId}`)
  },

  searchFolders: async (query) => {
    const response = await api.get('/folders/search', {
      params: { query },
    })
    return response.data
  },
}
