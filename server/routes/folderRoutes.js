const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const { authenticate } = require('../middleware/auth');

// All folder routes require authentication
router.use(authenticate);

// Create a new folder
router.post('/', folderController.createFolder);

// Get all folders for a user
router.get('/', folderController.getUserFolders);

// Get root folders
router.get('/root', folderController.getRootFolders);

// Get folder by ID
router.get('/:id', folderController.getFolderById);

// Update folder
router.put('/:id', folderController.updateFolder);

// Delete folder
router.delete('/:id', folderController.deleteFolder);

module.exports = router;