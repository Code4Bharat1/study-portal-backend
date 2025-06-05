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
  skillPoints: { type: Number, default: 0 },
  doneExercises: { type: [String], default: [] }, // Format: lang/level/seq (e.g., html/basic/1)
  doneProjects: { type: [String], default: [] }  // Format: lang/level/seq (e.g., html-css-js/basic/1)
});

module.exports = mongoose.model('User', userSchema);