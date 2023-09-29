const express = require('express');
const router = express.Router();

const searchAllController = require('../app/controller/SearchAllController');

router.get('/getAll/:name', searchAllController.getAll);
router.get('/getArtists/:name', searchAllController.getArtists);

module.exports = router;