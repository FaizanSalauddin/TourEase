// models/Package.js
// Tour Package schema for MongoDB

const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Package title is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    // e.g. "5 Days / 4 Nights"
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  itinerary: {
    type: String,
    default: ''
  },
  hotel: {
    type: String,
    default: ''
  },
  included: {
    type: [String], // Array of included items
    default: []
  },
  excluded: {
    type: [String], // Array of excluded items
    default: []
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5
  },
  featured: {
    type: Boolean,
    default: false // Mark as featured to show on homepage
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);