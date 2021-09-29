const express = require('express');
const { readArtistData, readFeatArtistData } = require('../controllers/artists_controller');

const router = express.Router();

router.get('/artists', readArtistData);
router.get('/featartists', readFeatArtistData);

module.exports = router;
