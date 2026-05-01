const Property = require('../models/Property');

// @desc    Create a new luxury property
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = async (req, res) => {
    try {
        const property = await Property.create(req.body);
        res.status(201).json({ 
            success: true, 
            data: property 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json({ 
            success: true, 
            count: properties.length,
            data: properties 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// @desc    Get a single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        res.status(200).json({ 
            success: true, 
            data: property 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Invalid Property ID' 
        });
    }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Returns the updated document instead of the old one
            runValidators: true // Ensures the new data matches the model rules
        });

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        res.status(200).json({ success: true, data: property });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        res.status(200).json({ success: true, message: 'Luxury property removed from portfolio' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty };