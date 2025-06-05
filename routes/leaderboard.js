  const express = require('express');
  const router = express.Router();
  const User = require('../models/User');
  const authMiddleware = require('../middleware/auth'); // Import the middleware
const { info } = require('console');
  require('dotenv').config();

  router.get('/', authMiddleware, async (req, res) => {
    try {
      console.info('Fetching leaderboard for user:', req.user.id); // Log user ID

      // Fetch top 100 users sorted by skillPoints (descending)
      const topUsers = await User.find()
        .sort({ skillPoints: -1 })
        .limit(100)
        .select('username skillPoints');

      if (!topUsers.length) {
        console.info('No users found in the database.');
        return res.status(404).json({ message: 'No users found' });
      }

      // Fetch the authenticated user's details
      const user = await User.findById(req.user.id).select('username skillPoints');
      console.info('Authenticated user details:', user); // Log user details
      if (!user) {
        console.info('Authenticated user not found:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
      }

      // Calculate ranks (1-based indexing)
      const leaderboard = topUsers.map((u, index) => ({
        rank: index + 1,
        username: u.username,
        skillPoints: u.skillPoints,
        medal: index === 0 ? 'diamond' : index === 1 ? 'gold' : index === 2 ? 'silver' : null
      }));

      // Find the authenticated user's rank
      const userRank = leaderboard.find(u => u.username === user.username) || {
        rank: (await User.countDocuments({ skillPoints: { $gt: user.skillPoints } })) + 1,
        username: user.username,
        skillPoints: user.skillPoints,
        medal: null
      };
      info(userRank)
      console.log(res.json({ leaderboard, user: userRank }));

      console.info('Leaderboard sent successfully');
    } catch (err) {
      console.error('Leaderboard error:', err.message, err.stack);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;  