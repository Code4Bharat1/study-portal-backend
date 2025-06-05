require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const auth  = require('./middleware/auth.js')


const app = express();

// Connect to MongoDB
connectDB();

// Middleware for security
app.use(helmet()); // Adds secure headers
app.use(compression()); // Gzip compression

// Rate limiting - especially useful for public APIs
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // limit each IP to 50 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use('/api/ask-gemini', apiLimiter);
  
// Allowed origins for frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://skill2future.code4bharat.com',
  'https://www.skill2future.code4bharat.com'
];  

// Enable CORS with options
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '1mb' })); // limit to prevent abuse

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/ask-gemini', require('./routes/gemini'));
app.use('/api/submit',require('./routes/sumbit.js'))
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Default error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
console.info('Server time:', new Date().toISOString());

// Start server
const PORT = process.env.PORT || 3902;
app.listen(PORT, () => console.info(`🚀 Server running on port ${PORT}`));
