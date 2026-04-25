// server.js
// Main entry point for TourEase backend server

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ==================== MIDDLEWARE ====================

// Enable CORS so frontend can call backend APIs
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================

// User routes: /api/users/register, /api/users/login, etc.
app.use('/api/users', require('./routes/userRoutes'));

// Package routes: /api/packages, /api/packages/:id, etc.
app.use('/api/packages', require('./routes/packageRoutes'));

// Booking routes: /api/bookings, /api/bookings/my, etc.
app.use('/api/bookings', require('./routes/bookingRoutes'));

// ==================== DEFAULT ROUTE ====================
app.get('/', (req, res) => {
  res.json({ message: 'TourEase API is running! 🚀' });
});

// ==================== ERROR HANDLER ====================
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TourEase Server running on http://localhost:${PORT}`);
});