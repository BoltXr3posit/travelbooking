const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a property title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    basePrice: {
        type: Number,
        required: [true, 'Please add a base price per night']
    },
    location: {
        address: String,
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: 'Zambia'
        }
    },
    amenities: {
        type: [String], // Array of strings like ["WiFi", "Pool"]
        default: []
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    },
    maxGuests: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);