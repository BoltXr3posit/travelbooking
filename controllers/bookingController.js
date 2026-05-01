const Booking = require('../models/Booking');
const Property = require('../models/Property');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private (Requires the user to be logged in)
const createBooking = async (req, res) => {
    try {
        const { property, checkInDate, checkOutDate } = req.body;

        // 1. Verify the property actually exists
        const propertyExists = await Property.findById(property);
        if (!propertyExists) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // 2. Calculate the number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        
        // Calculate the difference in milliseconds and convert to days
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (numberOfNights <= 0) {
            return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date' });
        }

        // 3. Calculate the total price
        const totalPrice = numberOfNights * propertyExists.basePrice;

        // 4. Create the booking record
        // Note: req.user.id will be provided by our Auth Middleware, which we will build next!
        const booking = await Booking.create({
            property,
            user: req.user.id, 
            checkInDate,
            checkOutDate,
            totalPrice
        });

        res.status(201).json({
            success: true,
            data: booking
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        // Find all bookings where the user ID matches the currently logged-in user
        // We also "populate" the property field so we get the lodge details, not just its ID
        const bookings = await Booking.find({ user: req.user.id }).populate({
            path: 'property',
            select: 'title location images'
        });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking, getMyBookings };