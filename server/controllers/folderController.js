const Folder = require('../models/folderModel');
const File = require('../models/fileModel');

// Create a new folder
exports.createFolder = async (req, res) => {
  try {
    const { name, description, parentFolderId } = req.body;
    const userId = req.userId; // Set by auth middleware

    const folder = await Folder.create(name, description, userId, parentFolderId);
    
    res.status(201).json({
      message: 'Folder created successfully',
      folder
    });
  } catch (error) {
    console.error('Create folder error:', error);
    res.status(500).json({ message: 'Server error creating folder' });
  }
};

// Get all folders for a user
exports.getUserFolders = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware
    
    const folders = await Folder.findByUserId(userId);
    
    res.status(200).json({ folders });
  } catch (error) {
    console.error('Get user folders error:', error);
    res.status(500).json({ message: 'Server error retrieving folders' });
  }
};

// Get folder by ID
exports.getFolderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Set by auth middleware
    
    const folder = await Folder.findById(id);
    
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    // Check if user has access to this folder
    if (folder.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Get subfolders
    const subfolders = await Folder.findByParentId(id, userId);
    
    // Get files in this folder
    const files = await File.findByFolderId(id, userId);
    
    res.status(200).json({
      folder,
      subfolders,
      files
    });
  } catch (error) {
    console.error('Get folder by ID error:', error);
    res.status(500).json({ message: 'Server error retrieving folder' });
  }
};

// Get root folders
exports.getRootFolders = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware
    
    const folders = await Folder.findRootFolders(userId);
    
    res.status(200).json({ folders });
  } catch (error) {
    console.error('Get root folders error:', error);
    res.status(500).json({ message: 'Server error retrieving root folders' });
  }
};

// Update folder
exports.updateFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.userId; // Set by auth middleware
    
    const folder = await Folder.findById(id);
    
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    // Check if user has access to this folder
    if (folder.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const updated = await Folder.update(id, { name, description }, userId);
    
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update folder' });
    }
    
    res.status(200).json({
      message: 'Folder updated successfully',
      folder: { ...folder, name, description }
    });
  } catch (error) {
    console.error('Update folder error:', error);
    res.status(500).json({ message: 'Server error updating folder' });
  }
};

// Delete folder
exports.deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; // Set by auth middleware
    
    const folder = await Folder.findById(id);
    
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    // Check if user has access to this folder
    if (folder.user_id !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const deleted = await Folder.delete(id, userId);
    
    if (!deleted) {
      return res.status(400).json({ message: 'Failed to delete folder' });
    }
    
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Delete folder error:', error);
    res.status(500).json({ message: 'Server error deleting folder' });
  }
};