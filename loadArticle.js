const mongoose = require('mongoose');
require('dotenv').config()
const mongoDB = `mongodb+srv://desi:${process.env.MONGO_KEY}@cluster0.86crs.mongodb.net/music_blog?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Article = require('./models/article');

const testArticle = new Article({title: "test article2", text: "text content"});

testArticle.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(testArticle);
});

