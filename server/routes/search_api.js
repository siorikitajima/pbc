const express = require('express');
const { readSearchData, readPresetData } = require('../controllers/search_controller');


const router = express.Router();

router.get('/search', readSearchData);
router.get('/preset', readPresetData);

module.exports = router;
