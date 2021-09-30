const express = require('express');
const { readSongData, readSongsData } = require('../controllers/songs_controller');

const router = express.Router();

router.get('/songs', readSongsData);

router.get('/songs/:id', readSongData)
module.exports = router;
