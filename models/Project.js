const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  url: { type: String, required: true },
  code: { type: Object, required: true },
  _id: { type: String, required: true, unique: true },
  upVotes: { type: Number, required: true , default: 0}
}, { _id: false });

module.exports = mongoose.model('Projects', projectSchema);