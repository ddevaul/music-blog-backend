const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require("passport-local").Strategy;
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const Article = require('../models/article');
const Comment = require('../models/comment');

exports.postComment = [
  body("content", "content required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      // There are errors. Render the form again with sanitized values/error messages.
      res.status(400).json('there was an error')
      return;
    } else {
        const comment = new Comment({
          content: req.body.content,
          username: req.user.user.username,
          userid: req.user.user._id,
          date: new Date(),
        });
        comment.save((err) => {
          if (err) {
            return next(err)
          }
        });
        Article.findById(req.params.id)
        .exec((err, article) => {
          article.title = article.title;
          article.content = article.content;
          article.comments = [comment, ...article.comments];
          article.save(function (err) {
            if (err) {
              console.log(err);
              return next(err);
            }
            res.json("comment posted");
            return;
        });
      });
    }
  }
]

exports.deleteComment = (req, res) => {
  console.log(req.user.user.username)
  Comment.findById(req.params.commentid).exec((err, comment) => {
    if (comment.userid === req.user.user._id || req.user.user.username === "Hamlet") {
      Comment.findByIdAndDelete(req.params.commentid).exec(() => res.json("Comment deleted"));
    }
  })
}

exports.total = (req, res) => {
  Article.count().exec((err, num) => res.json(num));
}

exports.individualArticle = (req, res) => {
  Article.find({_id: req.params.id}, 'title content comments').populate('comments').exec((err, article) => res.json(article))
}

exports.delete = (req, res) => {
  if (req.user.user.username === "Hamlet") {
    Article.findOneAndDelete({_id: req.params.id}).exec(() => res.json("Article deleted"));
  }
}

exports.put = [
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
    } else if (req.user.user.username === "Hamlet") {
        Article.findById(req.params.id)
        .exec((err, article) => {
          article.title = req.body.title;
          article.content = req.body.content;
          article.save(function (err) {
            if (err) {
              console.log(err);
              return next(err);
            }
            // Genre saved. Redirect to genre detail page.
            res.json("article uploaded");
          });
        });
        // Data from form is valid.
        // Check if Genre with same name already exists.
      
      }
    }
]

exports.index = (req, res) => {
  Article.find().sort({ date: -1 }).skip(parseInt(req.params.number)*10).limit(10).exec((err, posts) => {
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
    } else if (req.user.user.username === "Hamlet") {
        console.log("something")
        const article = new Article({
          title: req.body.title,
          content: req.body.content,
          date: new Date(),
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
      else {
        res.json("unauthorized user")
      }
    }
]