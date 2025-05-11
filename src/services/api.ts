// API service for interacting with the MySQL backend
// This is designed to work alongside the existing localStorage implementation

const API_URL = 'http://localhost:5000/api';

// Helper function to check if the backend is available
export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}`);
    return response.ok;
  } catch (error) {
    console.log('Backend not available, falling back to localStorage');
    return false;
  }
};

// Auth API
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  },
  
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },
  
  getCurrentUser: async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
};

// Folder API
export const folderApi = {
  createFolder: async (userId: string, name: string, description: string, parentFolderId?: string) => {
    try {
      const response = await fetch(`${API_URL}/folders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify({ name, description, parentFolderId }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Create folder error:', error);
      return null;
    }
  },
  
  getUserFolders: async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/folders`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get user folders error:', error);
      return null;
    }
  },
  
  getFolderById: async (userId: string, folderId: string) => {
    try {
      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get folder by ID error:', error);
      return null;
    }
  },
  
  getRootFolders: async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/folders/root`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get root folders error:', error);
      return null;
    }
  },
  
  updateFolder: async (userId: string, folderId: string, name: string, description: string) => {
    try {
      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify({ name, description }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Update folder error:', error);
      return null;
    }
  },
  
  deleteFolder: async (userId: string, folderId: string) => {
    try {
      const response = await fetch(`${API_URL}/folders/${folderId}`, {
        method: 'DELETE',
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Delete folder error:', error);
      return null;
    }
  },
};

// File API
export const fileApi = {
  uploadFile: async (userId: string, fileData: any) => {
    try {
      const response = await fetch(`${API_URL}/files/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify(fileData),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Upload file error:', error);
      return null;
    }
  },
  
  getUserFiles: async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/files`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get user files error:', error);
      return null;
    }
  },
  
  getFileById: async (userId: string, fileId: string) => {
    try {
      const response = await fetch(`${API_URL}/files/${fileId}`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get file by ID error:', error);
      return null;
    }
  },
  
  updateFile: async (userId: string, fileId: string, name: string, folderId?: string) => {
    try {
      const response = await fetch(`${API_URL}/files/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify({ name, folderId }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Update file error:', error);
      return null;
    }
  },
  
  deleteFile: async (userId: string, fileId: string) => {
    try {
      const response = await fetch(`${API_URL}/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Delete file error:', error);
      return null;
    }
  },
  
  shareFile: async (userId: string, fileId: string, email: string, permissionLevel: string) => {
    try {
      const response = await fetch(`${API_URL}/files/${fileId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify({ email, permissionLevel }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Share file error:', error);
      return null;
    }
  },
  
  getSharedFiles: async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/files/shared/with-me`, {
        headers: {
          'user-id': userId,
        },
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get shared files error:', error);
      return null;
    }
  },
};