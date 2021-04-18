const express = require('express');
const router = express.Router();
const controller = require('../controllers/articlesController');
const passport = require('passport');

router.post('/', [passport.authenticate('jwt', { session: false }), controller.indexPost]);
router.get('/article/:id/comment/:commentid', controller.postComment);
router.delete('/article/:id/comment/:commentid', [passport.authenticate('jwt', { session: false }), controller.deleteComment]);
router.post('/article/:id/comment', [passport.authenticate('jwt', { session: false }), controller.postComment]);
router.get('/article/:id', controller.individualArticle);
router.delete('/article/:id', [passport.authenticate('jwt', { session: false }), controller.delete]);
router.put('/article/:id', [passport.authenticate('jwt', { session: false }), controller.put]);
router.get('/total', controller.total);
router.get('/:number', controller.index);
// need a route that returns all comments, or maybe not if its included in the index
module.exports = router; 

