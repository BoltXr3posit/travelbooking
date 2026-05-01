const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Property = require('../models/Property');

// @desc    Create a Payment Intent to initiate a Stripe transaction
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
    try {
        const { propertyId, checkInDate, checkOutDate } = req.body;

        // 1. Get the REAL property from the database (Security Check)
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // 2. Calculate the exact number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDifference = checkOut.getTime() - checkIn.getTime();
        const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (numberOfNights <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid dates' });
        }

        // 3. Calculate the total price
        const totalAmount = numberOfNights * property.basePrice;

        // 4. Contact Stripe to create the PaymentIntent!
        // Note: Stripe requires the amount in CENTS, so we multiply by 100
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, 
            currency: 'usd',
            metadata: {
                propertyId: property._id.toString(),
                user: req.user.id
            }
        });

        // 5. Send the temporary Secret Key back to React
        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            totalPrice: totalAmount
        });

    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ success: false, message: 'Payment initiation failed' });
    }
};

module.exports = { createPaymentIntent };