const express = require('express');
const router = express.Router();

const playlistController = require('../app/controller/PlaylistController');

router.get('/playlist',playlistController.index);

module.exports = router;