const express = require('express');
// Import all 5 controller functions
const { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty } = require('../controllers/propertyController');
// Import both security guards
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getProperties) // Public: Anyone can see the grid
    .post(protect, adminOnly, createProperty); // Secure: Only Admins can add

router.route('/:id')
    .get(getPropertyById) // Public: Anyone can see details
    .put(protect, adminOnly, updateProperty) // Secure: Only Admins can edit
    .delete(protect, adminOnly, deleteProperty); // Secure: Only Admins can delete

module.exports = router;