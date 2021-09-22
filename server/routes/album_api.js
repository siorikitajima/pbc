const express = require('express');
const { readAlbumData } = require('../controllers/albums_controller');

const router = express.Router();

router.get('/albums', readAlbumData);

module.exports = router;
