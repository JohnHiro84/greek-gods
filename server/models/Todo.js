const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("todo", TodoSchema);
