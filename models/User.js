const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  _id: { type: String, required: true, unique: true },
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
  skillPoints: {type: Number, default: 0},
  doneExercises: {type: Array, default: []},  // Each item in format: lang/level/seq for example: html/basic/1 
  doneProjects: {type: Array, default: []}, // Each item in format: lang/level/seq for example: html-css-js/basic/1
}, { _id: false });

module.exports = mongoose.model('User', userSchema);
