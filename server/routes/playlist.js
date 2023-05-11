const express = require('express');
const router = express.Router();

const playlistController = require('../app/controller/PlaylistController');

router.get('/playlists', playlistController.getAll);

module.exports = router;