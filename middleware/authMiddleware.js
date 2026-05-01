const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists in the "Authorization" header
    // It usually comes in looking like: "Bearer eyJhbGciOiJIUzI1..."
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Split the string and grab just the scrambled token part
        token = req.headers.authorization.split(' ')[1];
    }

    // 2. If there is no token, kick them out immediately
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not authorized to access this route. Please log in.' 
        });
    }

    try {
        // 3. Verify the token is mathematically valid and hasn't expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Find the user in the database using the ID hidden inside the token payload
        req.user = await User.findById(decoded.id);

        // 5. Open the velvet rope and let them through to the controller!
        next();
    } catch (error) {
        // If the token is fake, expired, or tampered with, kick them out
        return res.status(401).json({ 
            success: false, 
            message: 'Session invalid or expired. Please log in again.' 
        });
    }
};

// Add this new function right below your protect function
const adminOnly = (req, res, next) => {
    // Check if the user exists and has the admin role
    if (req.user && req.user.role === 'admin') {
        next(); // Let them through!
    } else {
        res.status(403).json({ 
            success: false, 
            message: 'Access denied. You must be an admin to perform this action.' 
        });
    }
};

// Update your exports to include BOTH functions
module.exports = { protect, adminOnly };