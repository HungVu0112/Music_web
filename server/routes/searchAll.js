const express = require('express');
const router = express.Router();

const searchAllController = require('../app/controller/SearchAllController');

router.get('/getAll/:name', searchAllController.getAll);
router.get('/getArtists/:name', searchAllController.getArtists);
router.get('/getAlbums/:name', searchAllController.getAlbums);

module.exports = router;