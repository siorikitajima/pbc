const express = require('express');
const { readArtistData } = require('../controllers/artists_controller');

const router = express.Router();

router.get('/artists', readArtistData);

module.exports = router;
