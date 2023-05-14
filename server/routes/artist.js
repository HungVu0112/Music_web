const express = require('express');
const router = express.Router();

const artistController = require('../app/controller/ArtistController');

router.get('/artist/:name',artistController.getArtist);
router.get('/artist',artistController.index);

module.exports = router;