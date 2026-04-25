// routes/bookingRoutes.js
// Booking routes

const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

// Private routes (logged-in user)
router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);

// Admin only
router.get('/all', protect, adminOnly, getAllBookings);

module.exports = router;