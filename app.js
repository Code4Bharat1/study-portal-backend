const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const geminiRoutes = require('./routes/gemini')
require('dotenv').config();

const app = express();

// Middleware

// Middleware
const allowedOrigins = ['https://study-portal.code4bharat.com', 'https://www.study-portal.code4bharat.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies or authorization headers if needed
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/ask-gemini',geminiRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));