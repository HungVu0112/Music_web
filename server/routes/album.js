const express = require('express');
const router = express.Router();

const albumController = require('../app/controller/AlbumController');

router.get('/albums', albumController.getAlbums);

module.exports = router;