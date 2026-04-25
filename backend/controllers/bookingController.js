// controllers/bookingController.js
// Handles booking creation and retrieval

const Booking = require('../models/Booking');
const Package = require('../models/Package');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (logged-in users only)
const createBooking = async (req, res) => {
  try {
    const { packageId, name, email, phone, persons, date } = req.body;

    // Validate required fields
    if (!packageId || !name || !email || !phone || !persons || !date) {
      return res.status(400).json({ message: 'Please fill all booking fields' });
    }

    // Check if package exists and get price
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: 'Tour package not found' });
    }

    // Calculate total price
    const totalPrice = pkg.price * persons;

    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      packageId,
      name,
      email,
      phone,
      persons,
      date,
      totalPrice
    });

    // Populate package details in response
    const populatedBooking = await Booking.findById(booking._id).populate('packageId', 'title location image duration');

    res.status(201).json({
      message: 'Booking confirmed successfully!',
      booking: populatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get bookings of logged-in user
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('packageId', 'title location image duration price')
      .sort({ createdAt: -1 }); // Newest first

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/all
// @access  Admin Only
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('packageId', 'title location')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings };