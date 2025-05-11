const { pool } = require('../config/db');

class Folder {
  // Create a new folder
  static async create(name, description, userId, parentFolderId = null) {
    try {
      const [result] = await pool.query(
        'INSERT INTO folders (name, description, user_id, parent_folder_id) VALUES (?, ?, ?, ?)',
        [name, description, userId, parentFolderId]
      );
      return { 
        id: result.insertId, 
        name, 
        description, 
        user_id: userId, 
        parent_folder_id: parentFolderId 
      };
    } catch (error) {
      console.error('Error creating folder:', error.message);
      throw error;
    }
  }

  // Get folder by ID
  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM folders WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding folder by ID:', error.message);
      throw error;
    }
  }

  // Get all folders for a user
  static async findByUserId(userId) {
    try {
      const [rows] = await pool.query('SELECT * FROM folders WHERE user_id = ?', [userId]);
      return rows;
    } catch (error) {
      console.error('Error finding folders by user ID:', error.message);
      throw error;
    }
  }

  // Get folders by parent folder ID
  static async findByParentId(parentId, userId) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM folders WHERE parent_folder_id = ? AND user_id = ?',
        [parentId, userId]
      );
      return rows;
    } catch (error) {
      console.error('Error finding folders by parent ID:', error.message);
      throw error;
    }
  }

  // Get root folders (no parent)
  static async findRootFolders(userId) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM folders WHERE parent_folder_id IS NULL AND user_id = ?',
        [userId]
      );
      return rows;
    } catch (error) {
      console.error('Error finding root folders:', error.message);
      throw error;
    }
  }

  // Update folder
  static async update(id, folderData, userId) {
    try {
      const { name, description } = folderData;
      const [result] = await pool.query(
        'UPDATE folders SET name = ?, description = ? WHERE id = ? AND user_id = ?',
        [name, description, id, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating folder:', error.message);
      throw error;
    }
  }

  // Delete folder
  static async delete(id, userId) {
    try {
      const [result] = await pool.query(
        'DELETE FROM folders WHERE id = ? AND user_id = ?',
        [id, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting folder:', error.message);
      throw error;
    }
  }
}

module.exports = Folder;