const express = require('express');
const router = express.Router();

const aboutusController = require('../app/controller/AboutUsController');
router.get('/aboutus',aboutusController.index)
module.exports = router;