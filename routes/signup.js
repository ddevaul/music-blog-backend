const express = require('express');
const router = express.Router();
const controller = require('../controllers/signupController');

router.get('/', controller.indexRoute);
router.post('/', controller.indexPost);

module.exports = router; 

