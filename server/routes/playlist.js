const express = require('express');
const router = express.Router();

const playlistController = require('../app/controller/PlaylistController');

router.get('/playlists', playlistController.getAll);
router.get('/playlists/:name',playlistController.getPlaylist);

module.exports = router;