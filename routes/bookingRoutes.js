const express = require('express');
const { createBooking, getMyBookings } = require('../controllers/bookingController');
// We will build this 'protect' middleware in the next step to ensure only logged-in users can book
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply the 'protect' middleware to all booking routes
router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);

module.exports = router;