// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const { verifyToken } = require('./src/utils/jwtUtils');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// Example protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route', userId: req.userId });
});
app.get('/unprojected', (req, res) => {
  res.json({ message: 'unProtected route'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app instance
