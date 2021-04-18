const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const passport = require('passport');

router.get('/', [passport.authenticate('jwt', { session: false }), controller.index]);

module.exports = router; 

