// controllers/packageController.js
// Handles tour package CRUD operations

const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get featured packages (for homepage)
// @route   GET /api/packages/featured
// @access  Public
const getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({ featured: true }).limit(6);
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get single package by ID
// @route   GET /api/packages/:id
// @access  Public
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Create new package
// @route   POST /api/packages
// @access  Admin Only
const createPackage = async (req, res) => {
  try {
    const { title, location, duration, price, image, description, itinerary, hotel, included, excluded, featured } = req.body;

    // Validate required fields
    if (!title || !location || !duration || !price || !image || !description) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const pkg = await Package.create({
      title, location, duration, price, image, description,
      itinerary: itinerary || '',
      hotel: hotel || '',
      included: included || [],
      excluded: excluded || [],
      featured: featured || false
    });

    res.status(201).json({ message: 'Package created successfully', package: pkg });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Admin Only
const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Update fields
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Package updated successfully', package: updatedPackage });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Admin Only
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

module.exports = { getAllPackages, getFeaturedPackages, getPackageById, createPackage, updatePackage, deletePackage };