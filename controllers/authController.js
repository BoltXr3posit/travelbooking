const User = require('../models/User');

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({
        success: true,
        token,
        role: user.role // <-- ADD THIS: Send the role to React!
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Create the user
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password inputs
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // Check for user (we have to explicitly select the password because we hid it in the model)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { register, login };