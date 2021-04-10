const express = require('express');
const router = express.Router();
const controller = require('../controllers/articlesController');
const passport = require('passport');
const { body, validationResult } = require("express-validator");
const Article = require('../models/article');
const cors = require('cors');

router.get('/', controller.index);
router.post('/', cors(), [passport.authenticate('jwt', { session: false }), controller.indexPost])
router.get('/:id', cors(), controller.individualArticle)



module.exports = router; 

