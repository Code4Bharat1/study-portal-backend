// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route    POST api/feedback
// @desc     Submit feedback
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    const newFeedback = new Feedback({
      name,
      email,
      subject,
      message
    });

    await newFeedback.save();
    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!'
    });
  } catch (err) {
    console.error('Feedback error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});
module.exports = router;