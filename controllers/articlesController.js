const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const Article = require('../models/article');

exports.individualArticle = (req, res) => {
  Article.findById(req.params.id).exec((err, article) => res.json(article))
}

exports.index = (req, res) => {
  Article.find().exec((err, posts) => {
    if(err) return res.json(err);
    res.json(posts);
  })
}

exports.indexPost = [
  body("title", "title required").trim().isLength({ min: 1, max: 100 }).escape(),
  body("content", "content required").trim().isLength({ min: 1 }).escape(),
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
        const article = new Article({
          title: req.body.title,
          content: req.body.content,
        });
        // Data from form is valid.
        // Check if Genre with same name already exists.
        article.save(function (err) {
          if (err) {
            console.log(err);
            return next(err);
          }
          // Genre saved. Redirect to genre detail page.
          res.json("article uploaded");
        });
      }
    }
]