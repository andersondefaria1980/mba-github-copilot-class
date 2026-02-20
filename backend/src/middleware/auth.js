const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Extract Bearer token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: error.message });
  }
}

module.exports = authMiddleware;
