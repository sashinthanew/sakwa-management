const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, 'your_secret_key');
      console.log('Decoded token:', decoded); // Debug log
      
      // Add user data to request
      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      // For delete operations, verify admin role
      if (req.method === 'DELETE' && decoded.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Access denied. Only administrators can delete records.' 
        });
      }
      
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth; 