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
  }]
});

module.exports = mongoose.model('User', userSchema);