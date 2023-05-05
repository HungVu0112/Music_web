const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController');

router.post('/checkLogin', userController.checkLogin);
router.post('/checkSignup', userController.checkSignup);

module.exports = router;