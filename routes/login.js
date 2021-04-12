const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');
const cors = require('cors');

router.get('/', controller.index);

router.post('/', controller.login);

module.exports = router; 

