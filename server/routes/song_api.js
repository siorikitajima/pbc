const express = require('express');
const { readSongData } = require('../controllers/songs_controller');

const router = express.Router();

router.get('/songs', readSongData);

module.exports = router;
