const express = require('express');
const router = express.Router();

const songController = require('../app/controller/SongController');

router.get('/songs/getTops',songController.getTops);
router.get('/songs/:artistName',songController.getSongsbyartistName);

module.exports = router;