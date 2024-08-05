const express = require('express');
const router = express.Router();
const { getRecentPrices } = require('../controllers/priceController');

router.get('/recent', getRecentPrices);

module.exports = router;
