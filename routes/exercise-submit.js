const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res) => {
  const userId = req.headers['Authorization'];
  const { score, url } = req.body;

  if (!userId || !score ||!url) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.doneExercises.includes(url)){
      let maxScore = 0;
      if (url.split("/")[1] == "hard"){
        maxScore = 100;
      } else if (url.split("/")[1] == "intermediate"){
        maxScore = 70;
      } else{
        maxScore = 50;
      }
      user.skillPoints -= maxScore;
      user.skillPoints += score;
    }
    else{
      users.doneExercises.push(url);
      user.skillPoints += score;
    }

    await user.save();

    res.json({ message: 'Score updated', score: user.scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
