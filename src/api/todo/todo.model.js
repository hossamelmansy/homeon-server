const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    name: { type: String, require: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('todo', todoSchema);
