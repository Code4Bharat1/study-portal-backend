const express = require('express');
const router = express.Router();
const User = require('../models/User');

const scoreMap = {
  basic: 10,
  intermediate: 20,
  hard: 30,
};

router.post('/', async (req, res) => {
  const { userId, level, passedTestCases, totalTestCases } = req.body;

  if (!userId || !level || passedTestCases == null || totalTestCases == null) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const score = (passedTestCases === totalTestCases) ? scoreMap[level] || 0 : 0;

    if (score > 0) {
      user.scores[level] += score;
      user.scores.total += score;
    }

    user.attempts.push({
      level,
      timeTaken: 0,
      runs: 0,
      errors: 0,
      passedTestCases,
      totalTestCases,
      score,
    });

    await user.save();

    res.json({ message: 'Score updated', score: user.scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
