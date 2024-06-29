// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.userId = decoded.userId;
      next();
    });
  },
};
