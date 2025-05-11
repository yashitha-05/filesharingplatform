const File = require('../models/fileModel');
const User = require('../models/userModel');

// Upload a new file
exports.uploadFile = async (req, res) => {
  try {
    // Note: In a real implementation, you would handle file uploads with multer or similar
    // and store the file path. This is a simplified version.
    const { name, filePath, fileType, fileSize, folderId } = req.body;
    const userId = req.userId; // Set by auth middleware

    const fileData = {
      name,
      filePath,
      fileType,
      fileSize,
      folderId: folderId || null,
      userId
    };

    const file = await File.create(fileData);
    
    res.status(201).json({
      message: 'File uploaded successfully',
      file
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Server error uploading file' });
  }
};

// Get all files for a user
exports.getUserFiles = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware
    
    const files = await File.findByUserId(userId);
    
    res.status(200).json({ files });
  } catch (error) {
    console.error('Get user files error:', error);
    res.status(500).json({ message: 'Server error retrieving files' });
  }
};

// Get file by ID
exports.getFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Set by auth middleware
    
    const file = await File.findById(id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Check if user has access to this file
    if (file.user_id !== userId) {
      // Check if file is shared with this user
      const sharedFiles = await File.findSharedWithUser(userId);
      const isShared = sharedFiles.some(sharedFile => sharedFile.id === parseInt(id));
      
      if (!isShared) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.status(200).json({ file });
  } catch (error) {
    console.error('Get file by ID error:', error);
    res.status(500).json({ message: 'Server error retrieving file' });
  }
};

// Update file
exports.updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, folderId } = req.body;
    const userId = req.userId; // Set by auth middleware
    
    const file = await File.findById(id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Check if user has access to this file
    if (file.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updated = await File.update(id, { name, folderId }, userId);
    
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update file' });
    }
    
    res.status(200).json({
      message: 'File updated successfully',
      file: { ...file, name, folder_id: folderId }
    });
  } catch (error) {
    console.error('Update file error:', error);
    res.status(500).json({ message: 'Server error updating file' });
  }
};

// Delete file
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Set by auth middleware
    
    const file = await File.findById(id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Check if user has access to this file
    if (file.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const deleted = await File.delete(id, userId);
    
    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete file' });
    }
    
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ message: 'Server error deleting file' });
  }
};

// Share file with another user
exports.shareFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, permissionLevel } = req.body;
    const sharedByUserId = req.userId; // Set by auth middleware
    
    // Find the file
    const file = await File.findById(id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Check if user owns this file
    if (file.user_id !== sharedByUserId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Find the user to share with
    const sharedWithUser = await User.findByEmail(email);
    
    if (!sharedWithUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Share the file
    await File.shareFile(id, sharedWithUser.id, sharedByUserId, permissionLevel);
    
    res.status(200).json({ message: 'File shared successfully' });
  } catch (error) {
    console.error('Share file error:', error);
    res.status(500).json({ message: 'Server error sharing file' });
  }
};

// Get files shared with user
exports.getSharedFiles = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware
    
    const sharedFiles = await File.findSharedWithUser(userId);
    
    res.status(200).json({ files: sharedFiles });
  } catch (error) {
    console.error('Get shared files error:', error);
    res.status(500).json({ message: 'Server error retrieving shared files' });
  }
};