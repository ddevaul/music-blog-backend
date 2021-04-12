/* 

2. Add routes/controllers
3. Set up Passport and JWT
1. Initialize Git Repo
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const articlesRouter = require('./routes/articles');
const cors = require('cors');


const app = express();

/*
--------------------------------------------------------------------------------
Set up database connection 
*/
//Import the mongoose module
const mongoose = require('mongoose');
require('dotenv').config()
//Set up default mongoose connection
const mongoDB = `mongodb+srv://desi:${process.env.MONGODB_KEY}@cluster0.86crs.mongodb.net/music_blog?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* 
--------------------------------------------------------------------------------
App middleware 
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( cors({ origin: true, credentials: true}));
  
/* 
--------------------------------------------------------------------------------
Routes
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/articles', articlesRouter);

/* 
--------------------------------------------------------------------------------
Passport 
*/
require('./config/passport');

/* 
--------------------------------------------------------------------------------
Error handling
*/

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
