const express = require('express');
const router = express.Router();
const { calculateCheckout } = require('../controllers/checkoutController');

router.post('/calculate', calculateCheckout);

module.exports = router;
