// routes/userRoutes.js
// User authentication routes

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Private routes (requires login)
router.get('/profile', protect, getUserProfile);

module.exports = router;