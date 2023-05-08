const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController');

router.post('/checkLogin', userController.checkLogin);
router.post('/checkSignup', userController.checkSignup);
router.get('/user/playlist/create/:name', userController.createPlaylist);
router.get('/user/playlist/delete/:id&:username', userController.deletePlaylist);
router.get('/user/:username', userController.getUser);

module.exports = router;