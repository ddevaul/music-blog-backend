const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  date: {type: Date, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Author'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

ArticleSchema.virtual('url').get(function() {
  return `articles/${this.id}`});
// Compile model from schema

module.exports = mongoose.model('Article', ArticleSchema );