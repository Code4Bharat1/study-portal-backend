const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected for population'))
  .catch((err) => console.error('MongoDB connection error:', err));

const quizTypes = ['react', 'express', 'mongodb', 'nodejs'];
const difficulties = ['basic', 'intermediate', 'hard'];

const generateQuestions = (quizType, difficulty, count) => {
  const questions = [];
  for (let i = 1; i <= count; i++) {
    questions.push({
      question: `Sample ${quizType} ${difficulty} question ${i}`,
      options: [
        `Option 1 for ${quizType} ${difficulty} ${i}`,
        `Option 2 for ${quizType} ${difficulty} ${i}`,
        `Option 3 for ${quizType} ${difficulty} ${i}`,
        `Option 4 for ${quizType} ${difficulty} ${i}`
      ],
      correctAnswer: `Option 1 for ${quizType} ${difficulty} ${i}`,
      category: quizType,
      difficulty
    });
  }
  return questions;
};

const populateDB = async () => {
  try {
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    for (const quizType of quizTypes) {
      for (const difficulty of difficulties) {
        const questions = generateQuestions(quizType, difficulty, 50);
        await Question.insertMany(questions);
        console.log(`Inserted 50 ${difficulty} questions for ${quizType}`);
      }
    }

    console.log('Database population complete');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating database:', err);
    mongoose.connection.close();
  }
};

populateDB();