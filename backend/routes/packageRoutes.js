// routes/packageRoutes.js
// Tour package routes

const express = require('express');
const router = express.Router();
const {
  getAllPackages,
  getFeaturedPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', getAllPackages);
router.get('/featured', getFeaturedPackages);
router.get('/:id', getPackageById);

// Admin-only routes
router.post('/', protect, adminOnly, createPackage);
router.put('/:id', protect, adminOnly, updatePackage);
router.delete('/:id', protect, adminOnly, deletePackage);

module.exports = router;