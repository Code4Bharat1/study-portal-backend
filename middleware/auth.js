const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from headers
  let token = req.header('x-auth-token') || req.header('Authorization');

  // If using "Bearer <token>", extract actual token
  if (token?.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  if (!token) {
    console.info('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.info('Token verified successfully for user:', decoded.user?.id || decoded._id);

    // Attach decoded user info to request
    req.user = decoded.user || { id: decoded._id }; // compatible with both payload types

    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
//       {