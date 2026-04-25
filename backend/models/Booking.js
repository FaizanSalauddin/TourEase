// models/Booking.js
// Booking schema for MongoDB

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  persons: {
    type: Number,
    required: [true, 'Number of persons is required'],
    min: 1
  },
  date: {
    type: Date,
    required: [true, 'Travel date is required']
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed' // Simple flow - auto confirm
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);