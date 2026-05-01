const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Links to the User model
        required: true
    },
    property: {
        type: mongoose.Schema.ObjectId,
        ref: 'Property', // Links to the Property model
        required: true
    },
    checkInDate: {
        type: Date,
        required: [true, 'Please add a check-in date']
    },
    checkOutDate: {
        type: Date,
        required: [true, 'Please add a check-out date']
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentId: {
        type: String // To store the Stripe or PayPal transaction ID later
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);