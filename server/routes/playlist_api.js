const express = require('express');
const { readPlaylistData, postPlaylistData } = require('../controllers/playlist_controller');

const router = express.Router();

router.get('/playlist/:id', readPlaylistData);
router.post('/playlist', postPlaylistData);

module.exports = router;
