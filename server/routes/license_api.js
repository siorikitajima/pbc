const express = require('express');
const { readLicenseData, readPromoData, getOrderData, postOrderData, downloadMp3s, downloadInvoice } = require('../controllers/license_controller');


const router = express.Router();

router.get('/license', readLicenseData);
router.get('/promo', readPromoData);
router.post('/order', postOrderData);
router.get('/order/:id', getOrderData);
router.post('/files', downloadMp3s);
router.get('/download-invoice/:id', downloadInvoice);

module.exports = router;
