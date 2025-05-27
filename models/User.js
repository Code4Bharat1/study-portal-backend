const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginCount: { type: Number, default: 0 },
  seenQuestions: [{
    quizType: { type: String, required: true },
    difficulty: { type: String, required: true },
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
  }],
  scores: {
    basic: { type: Number, default: 0 },
    intermediate: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  attempts: [
    {
      level: String,
      timeTaken: Number,
      runs: Number,
      errors: Number,
      passedTestCases: Number,
      totalTestCases: Number,
      score: Number,
      submittedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
