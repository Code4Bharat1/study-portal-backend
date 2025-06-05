const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Question = require('../models/Question');
require('dotenv').config();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get questions by quiz type
router.get('/:quizType', auth, async (req, res) => {
  const { quizType } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Determine difficulty based on loginCount
    let difficulty;
    if (user.loginCount <= 5) {
      difficulty = 'basic';
    } else if (user.loginCount <= 10) {
      difficulty = 'intermediate';
    } else {
      difficulty = 'hard';
    }

    // Find seen question IDs for this quizType and difficulty
    const seenEntry = user.seenQuestions.find(
      (entry) => entry.quizType === quizType && entry.difficulty === difficulty
    );
    const seenQuestionIds = seenEntry ? seenEntry.questionIds : [];

    // Fetch 10 random unseen questions
    let questions = await Question.aggregate([
      {
        $match: {
          category: quizType,
          difficulty,
          _id: { $nin: seenQuestionIds }
        }
      },
      { $sample: { size: 10 } }
    ]);

    // If fewer than 10 questions, reset seenQuestions for this difficulty
    if (questions.length < 10) {
      if (seenEntry) {
        seenEntry.questionIds = [];
      }
      questions = await Question.aggregate([
        {
          $match: {
            category: quizType,
            difficulty
          }
        },
        { $sample: { size: 10 } }
      ]);
    }





    // Update seenQuestions
    if (!seenEntry) {
      user.seenQuestions.push({
        quizType,
        difficulty,
        questionIds: questions.map((q) => q._id)
      });
    } else {
      seenEntry.questionIds.push(...questions.map((q) => q._id));
    }
    await user.save();

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

