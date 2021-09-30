const express = require('express');
const { readAlbumsData, readAlbumData } = require('../controllers/albums_controller');

const router = express.Router();

router.get('/albums', readAlbumsData);

router.get('/albums/:id', readAlbumData);

module.exports = router;
