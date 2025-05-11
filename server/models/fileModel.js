const { pool } = require('../config/db');

class File {
  // Create a new file
  static async create(fileData) {
    try {
      const { name, filePath, fileType, fileSize, folderId, userId } = fileData;
      const [result] = await pool.query(
        'INSERT INTO files (name, file_path, file_type, file_size, folder_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, filePath, fileType, fileSize, folderId, userId]
      );
      return { 
        id: result.insertId, 
        name, 
        file_path: filePath, 
        file_type: fileType, 
        file_size: fileSize, 
        folder_id: folderId, 
        user_id: userId 
      };
    } catch (error) {
      console.error('Error creating file:', error.message);
      throw error;
    }
  }

  // Get file by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM files WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding file by ID:', error.message);
      throw error;
    }
  }

  // Get all files for a user
  static async findByUserId(userId) {
    try {
      const [rows] = await pool.query('SELECT * FROM files WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      console.error('Error finding files by user ID:', error.message);
      throw error;
    }
  }

  // Get files by folder ID
  static async findByFolderId(folderId, userId) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM files WHERE folder_id = ? AND user_id = ?',
        [folderId, userId]
      );
      return rows;
    } catch (error) {
      console.error('Error finding files by folder ID:', error.message);
      throw error;
    }
  }

  // Get files shared with a user
  static async findSharedWithUser(userId) {
    try {
      const [rows] = await pool.query(`
        SELECT f.*, fs.permission_level, u.name as shared_by_name
        FROM files f
        JOIN file_shares fs ON f.id = fs.file_id
        JOIN users u ON fs.shared_by_user_id = u.id
        WHERE fs.shared_with_user_id = ?
      `, [userId]);
      return rows;
    } catch (error) {
      console.error('Error finding shared files:', error.message);
      throw error;
    }
  }

  // Update file
  static async update(id, fileData, userId) {
    try {
      const { name, folderId } = fileData;
      const [result] = await pool.query(
        'UPDATE files SET name = ?, folder_id = ? WHERE id = ? AND user_id = ?',
        [name, folderId, id, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating file:', error.message);
      throw error;
    }
  }

  // Delete file
  static async delete(id, userId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM files WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting file:', error.message);
      throw error;
    }
  }

  // Share file with another user
  static async shareFile(fileId, sharedWithUserId, sharedByUserId, permissionLevel = 'read') {
    try {
      const [result] = await pool.query(
        'INSERT INTO file_shares (file_id, shared_with_user_id, shared_by_user_id, permission_level) VALUES (?, ?, ?, ?)',
        [fileId, sharedWithUserId, sharedByUserId, permissionLevel]
      );
      return { id: result.insertId };
    } catch (error) {
      console.error('Error sharing file:', error.message);
      throw error;
    }
  }

  // Remove file share
  static async removeShare(fileId, sharedWithUserId, sharedByUserId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM file_shares WHERE file_id = ? AND shared_with_user_id = ? AND shared_by_user_id = ?',
        [fileId, sharedWithUserId, sharedByUserId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error removing file share:', error.message);
      throw error;
    }
  }
}

module.exports = File;