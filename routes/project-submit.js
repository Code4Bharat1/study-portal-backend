const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');


router.post('/', async (req, res) => {
  const { userId, score, url , code} = req.body;

  if (!userId || !score ||!url || !code) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.doneProjects.includes(url)){
      let maxScore = 0;
      if (url.split("/")[1] == "hard"){
        maxScore = 300;
      } else if (url.split("/")[1] == "intermediate"){
        maxScore = 225;
      } else{
        maxScore = 150;
      }
      user.skillPoints -= maxScore;
      user.skillPoints += score;

      // Add to the projects model
    }
    else{
      users.doneProject.push(url);
      user.skillPoints += score;

      // add to the project model
    }

    await user.save();

    res.json({ message: 'Score updated', score: user.scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
