const express = require('express');
const { form_post, order_comfirmation, stem_request } = require('../controllers/mail_controller');

const router = express.Router();

router.post('/form', form_post);
router.post('/order-conf', order_comfirmation);
router.post('/stem-request', stem_request);

module.exports = router;
