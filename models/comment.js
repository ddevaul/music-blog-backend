const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {type: String, required: true},
  username: {type: String, required: true},
  userid: {type: String, required: true},
  date: {type: Date, required: true},
});

module.exports = mongoose.model('Comment', CommentSchema );