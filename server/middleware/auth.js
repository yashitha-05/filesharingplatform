const User = require('../models/userModel');

// Simple authentication middleware
// In a production app, you would use JWT or sessions
exports.authenticate = async (req, res, next) => {
  try {
    // Get user ID from request headers
    const userId = req.headers['user-id'];
    
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Find user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid user ID' });
    }
    
    // Set user ID in request for use in controllers
    req.userId = user.id;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};