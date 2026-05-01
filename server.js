const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON data and allow cross-origin requests
app.use(express.json());
app.use(cors());

// --- ROUTE MOUNTING ---
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')); // <-- Add this new line

// A simple test route
app.get('/', (req, res) => {
    res.send('Travel Booking API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in luxury mode on port ${PORT}`);
});