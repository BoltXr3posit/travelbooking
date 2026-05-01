const express = require('express');
// Import the new getPropertyById function
const { createProperty, getProperties, getPropertyById } = require('../controllers/propertyController');

const router = express.Router();

// Map the routes to the controller functions
router.route('/')
    .get(getProperties)
    .post(createProperty);

// This new route catches requests with an ID parameter (like /api/properties/123)
router.route('/:id')
    .get(getPropertyById);

module.exports = router;