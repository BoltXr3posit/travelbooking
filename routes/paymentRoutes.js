const express = require('express');
const { createPaymentIntent } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// This route requires the user to be logged in (protect)
router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;