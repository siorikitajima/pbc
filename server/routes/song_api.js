const express = require('express');
const { readSongData, readSongsData, readSingleSongData } = require('../controllers/songs_controller');

const router = express.Router();

router.get('/songs', readSongsData);

router.get('/songs/:id', readSongData)

router.get('/singlesong/:id', readSingleSongData)
module.exports = router;
