const express = require('express');
const { readArtistsData, readArtistData, readProjectData, readFeatArtistData } = require('../controllers/artists_controller');

const router = express.Router();

router.get('/artists', readArtistsData);
router.get('/artist/:slug', readArtistData);
router.get('/project/:slug', readProjectData);
router.get('/featartists', readFeatArtistData);

module.exports = router;
