const express = require('express');
const { form_post } = require('../controllers/form_controller');

const router = express.Router();

router.post('/form', form_post);

module.exports = router;
