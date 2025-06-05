const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Add this import
const User = require('../models/User');
require('dotenv').config();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'User already exists' });

    user = new User({ 
      username, 
      email, 
      _id: new mongoose.Types.ObjectId().toString(), 
      password 
    });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user._id.toString() } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

    console.info("✅ Registered user:", email);
    
    // FIXED: Also return userId in register response
    res.json({ 
      token,
      userId: user._id.toString(), // Add userId here too
      username: user.username
    });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route - FIXED VERSION
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.info("🔐 Login attempt for:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.info("❌ User not found:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.info("❌ Password mismatch for:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Initialize loginCount if it doesn't exist
    if (!user.loginCount) {
      user.loginCount = 0;
    }
    
    user.loginCount += 1;
    await user.save();

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.info("✅ Login successful:", email);
    
    // FIXED: Added userId to response
    const responseData = {
      token,
      userId: user._id.toString(), // ← THIS WAS MISSING!
      loginCount: user.loginCount,
      username: user.username,
      email: user.email // Optional: also include email
    };

    console.info("📤 Sending login response:", {
      ...responseData,
      token: "HIDDEN" // Don't log the actual token
    });

    res.json(responseData);
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;