const express = require('express');
const router = express.Router();

const userController = require('../app/controller/UserController');

router.post('/checkLogin', userController.checkLogin);
router.post('/checkSignup', userController.checkSignup);
router.get('/user/favourite/songs/delete/:name&:username', userController.deleteFVSong);
router.get('/user/favourite/artists/delete/:name&:username', userController.deleteFVArtist);
router.get('/user/favourite/playlists/delete/:username&:name', userController.deleteFVPlaylist);
router.get('/user/favourite/songs/:name&:username', userController.addFVSong);
router.get('/user/favourite/artists/:name&:username', userController.addFVArtist);
router.get('/user/favourite/playlists/:username&:name', userController.addFVPlaylist);
router.get('/user/playlist/create/:name', userController.createPlaylist);
router.get('/user/playlist/searchSong/:name&:playlistName&:username', userController.searchSong);
router.get('/user/playlist/addSong/:name&:playlistName&:username', userController.addSong);
router.get('/user/playlist/delete/:id&:username', userController.deletePlaylist);
router.get('/user/playlist/:name&:username', userController.getPlaylist);
router.get('/user/:username', userController.getUser);

module.exports = router;