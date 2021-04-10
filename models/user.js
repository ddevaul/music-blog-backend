const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

// Compile model from schema
module.exports = mongoose.model('User', UserSchema );