const express = require("express");
const router = express.Router();
const Score = require("../models/Score");
const authenticate = require("../middleware/auth");

// @route    POST api/scores
// @desc     Save quiz score
router.post("/", authenticate, async (req, res) => {
  try {
    const { score, totalQuestions, category } = req.body;

    const newScore = new Score({
      user: req.user.id,
      score,
      totalQuestions,
      category,
      percentage: Math.round((score / totalQuestions) * 100),
    });

    await newScore.save();

    res.json({
      success: true,
      score: newScore,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route    GET api/scores/user/:userId
// @desc     Get user's scores
router.get("/user/:userId", async (req, res) => {
  try {
    const scores = await Score.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    const highestScore = await Score.findOne({ user: req.params.userId })
      .sort({ percentage: -1 });

    res.json({
      success: true,
      scores,
      highestScore: highestScore || null,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
