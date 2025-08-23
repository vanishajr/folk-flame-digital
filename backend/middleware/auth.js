// Mock authentication middleware for demo purposes
const auth = (req, res, next) => {
  try {
    // In a real app, this would verify JWT tokens
    // For demo, we'll just check if a user-id header is present
    const userId = req.headers['user-id'] || req.headers['authorization'];
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Mock user verification
    req.user = { _id: userId };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid.'
    });
  }
};

module.exports = auth;
