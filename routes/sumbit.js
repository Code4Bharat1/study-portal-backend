const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // ADD THIS MISSING IMPORT
const router = express.Router();
const User = require('../models/User');

// Fixed LEVEL_SCORE_MAP structure to match frontend expectations
const LEVEL_SCORE_MAP = {
  basic: 50,
  intermediate: 70, 
  hard: 100
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

router.post('/', authenticateToken, async (req, res) => {
  const { userId, score, url, type } = req.body;

  console.log('Received submission:', { userId, score, url, type });

  // Enhanced validation
  if (!userId || score === undefined || !url || !type) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      received: { userId, score, url, type }
    });
  }

  // Validate user ID format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  // Validate type
  if (!['exercise', 'project'].includes(type)) {
    return res.status(400).json({ message: 'Invalid submission type' });
  }

  // Validate score
  if (typeof score !== 'number' || score < 0) {
    return res.status(400).json({ message: 'Invalid score value' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract difficulty from URL
    const urlParts = url.split('/').filter(part => part);
    let difficulty;
    
    if (urlParts.includes('basic') || urlParts.includes('easy')) {
      difficulty = 'basic';
    } else if (urlParts.includes('intermediate') || urlParts.includes('medium')) {
      difficulty = 'intermediate';
    } else if (urlParts.includes('hard') || urlParts.includes('advanced')) {
      difficulty = 'hard';
    } else {
      difficulty = urlParts.find(part => ['basic', 'intermediate', 'hard'].includes(part)) || 'basic';
    }

    console.log('Extracted difficulty:', difficulty);

    const maxScore = LEVEL_SCORE_MAP[difficulty];
    if (!maxScore) {
      return res.status(400).json({ 
        message: 'Invalid difficulty',
        difficulty,
        url 
      });
    }

    // Initialize user fields if they don't exist
    if (!user.doneExercises) user.doneExercises = [];
    if (!user.doneProjects) user.doneProjects = [];
    if (!user.scores) {
      user.scores = {
        basic: 0,
        intermediate: 0,
        hard: 0,
        total: 0
      };
    }
    if (!user.skillPoints) user.skillPoints = 0;

    // Initialize submissions tracking for score updates
    if (!user.submissions) user.submissions = new Map();

    const targetArray = type === 'exercise' ? user.doneExercises : user.doneProjects;
    const submissionKey = `${type}_${url}`;
    
    // Check if already completed and get previous score
    const alreadyCompleted = targetArray.includes(url);
    const previousScore = user.submissions.get(submissionKey) || 0;
    
    if (alreadyCompleted) {
      console.log('Updating existing submission - Previous score:', previousScore);
      // Remove previous score and add new score
      user.skillPoints = Math.max(0, user.skillPoints - previousScore + score);
      user.scores[difficulty] = Math.max(0, user.scores[difficulty] - previousScore + score);
    } else {
      console.log('New submission');
      targetArray.push(url);
      user.skillPoints += score;
      user.scores[difficulty] += score;
    }

    // Store the current score for future updates
    user.submissions.set(submissionKey, score);

    // Recalculate total
    user.scores.total = user.scores.basic + user.scores.intermediate + user.scores.hard;

    await user.save();

    console.log('Score updated successfully:', {
      scores: user.scores,
      skillPoints: user.skillPoints,
      previousScore,
      newScore: score
    });

    res.json({ 
      message: 'Score updated successfully', 
      scores: user.scores, 
      skillPoints: user.skillPoints,
      difficulty,
      maxScore,
      wasUpdate: alreadyCompleted
    });

  } catch (err) {
    console.error('Submission error:', err);
    
    // More specific error messages
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid data format' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error: ' + err.message 
      });
    }
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate entry' });
    }
    
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;  