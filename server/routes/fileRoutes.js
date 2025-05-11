const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { authenticate } = require('../middleware/auth');

// All file routes require authentication
router.use(authenticate);

// Upload a new file
router.post('/upload', fileController.uploadFile);

// Get all files for a user
router.get('/', fileController.getUserFiles);

// Get file by ID
router.get('/:id', fileController.getFileById);

// Update file
router.put('/:id', fileController.updateFile);

// Delete file
router.delete('/:id', fileController.deleteFile);

// Share file with another user
router.post('/:id/share', fileController.shareFile);

// Get files shared with user
router.get('/shared/with-me', fileController.getSharedFiles);

module.exports = router;