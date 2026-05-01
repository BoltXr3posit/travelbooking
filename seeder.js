const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Property = require('./models/Property');

// Load environment variables so we can connect to the database
dotenv.config();

// Connect to MongoDB
connectDB();

const sampleProperty = [
    {
        title: "The Royal Zambezi Lodge",
        description: "An intimate, luxury safari lodge situated on the banks of the mighty Zambezi River.",
        basePrice: 850.00,
        location: {
            address: "Lower Zambezi National Park",
            city: "Chiawa",
            country: "Zambia"
        },
        amenities: ["Private Plunge Pool", "Spa", "Guided Safaris", "Wi-Fi"],
        images: ["https://example.com/images/zambezi-1.jpg"],
        maxGuests: 2
    }
];

const importData = async () => {
    try {
        // Clear out any accidental old data first
        await Property.deleteMany(); 
        
        // Insert our luxury lodge
        await Property.insertMany(sampleProperty);
        
        console.log('Luxury Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

// Execute the function
importData();