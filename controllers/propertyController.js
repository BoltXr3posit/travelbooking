const Property = require('../models/Property');

// @desc    Create a new luxury property
// @route   POST /api/properties
// @access  Public (We will restrict this to admins later)
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

// FIX: Make sure getPropertyById is added to this export list!
module.exports = { createProperty, getProperties, getPropertyById };