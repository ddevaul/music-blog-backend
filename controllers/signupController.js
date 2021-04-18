const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const User = require('../models/user');

exports.indexRoute = (req, res) => {
  res.json("this is where you would sign up");
}

exports.indexPost = [
  body("username", "username required").trim().isLength({ min: 1, max: 30 }).escape(),
  body("password", "password required").trim().isLength({ min: 1 }).escape(),
  body("confirmation", "please confirm your password")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400);
      res.json('there was an error')
      return;
    } else {
      User.find({ username: req.body.username })
      .exec((err, users) => {
        if (users.length > 0){
          res.json({ message: 'username already taken' });
          return;
        }
        else if (req.body.password !== req.body.confirmation){
          res.json({ message: 'passwords must match' });
          return;
        } 
        else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
          });
          // Data from form is valid.
          // Check if Genre with same name already exists.
          user.save(function (err) {
            if (err) {
              console.log(err);
              return next(err);
            }
            // Genre saved. Redirect to genre detail page.
            res.json({ message: "user created" });
           });
          });
        }
      })
    }
  },
];