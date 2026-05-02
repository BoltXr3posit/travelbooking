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
        images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1468&auto=format&fit=crop"],
        maxGuests: 2
    },
    {
        title: "The Victoria Falls Retreat",
        description: "A breathtaking luxury resort overlooking the edge of the magnificent Victoria Falls. Wake up to the mist of the 'Smoke that Thunders'.",
        basePrice: 1200.00,
        location: {
            address: "Mosi-oa-Tunya National Park",
            city: "Livingstone",
            country: "Zambia"
        },
        amenities: ["Infinity Pool", "Private Butler", "Helicopter Tours", "Wi-Fi"],
        images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop"],
        maxGuests: 4
    },
    {
        title: "Serengeti Canvas Camp",
        description: "Experience the Great Migration from the comfort of a five-star luxury tent featuring mahogany furnishings and brass soaking tubs.",
        basePrice: 950.00,
        location: {
            address: "Serengeti National Park",
            city: "Seronera",
            country: "Tanzania"
        },
        amenities: ["Game Drives", "Campfire Dining", "Luxury Tents", "Wi-Fi"],
        images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1468&auto=format&fit=crop"],
        maxGuests: 2
    },
    {
        title: "Santorini Cliffside Villa",
        description: "A pristine white-washed villa carved into the Caldera cliffs, offering uninterrupted sunset views over the Aegean Sea.",
        basePrice: 1500.00,
        location: {
            address: "Oia Cliff Walk",
            city: "Santorini",
            country: "Greece"
        },
        amenities: ["Private Hot Tub", "Wine Cellar", "Yacht Access", "Wi-Fi"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1470&auto=format&fit=crop"],
        maxGuests: 6
    },
    {
        title: "Kyoto Zen Garden Ryokan",
        description: "A traditional Japanese inn elevated to modern luxury, featuring private onsen (hot springs) and authentic kaiseki dining.",
        basePrice: 800.00,
        location: {
            address: "Arashiyama Bamboo Grove",
            city: "Kyoto",
            country: "Japan"
        },
        amenities: ["Private Onsen", "Tea Ceremony", "Zen Garden", "Spa"],
        images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1470&auto=format&fit=crop"],
        maxGuests: 2
    },
    {
        title: "Maldives Overwater Bungalow",
        description: "Sleep directly above crystal-clear turquoise waters. Slide from your private deck straight into a vibrant coral reef.",
        basePrice: 2200.00,
        location: {
            address: "Baa Atoll",
            city: "Male",
            country: "Maldives"
        },
        amenities: ["Glass Floors", "Scuba Diving", "Overwater Spa", "Private Chef"],
        images: ["https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1587&auto=format&fit=crop"],
        maxGuests: 2
    },
    {
        title: "Swiss Alps Ski Chalet",
        description: "A cozy yet expansive wooden chalet offering ski-in/ski-out access, a massive stone fireplace, and panoramic views of the Matterhorn.",
        basePrice: 1800.00,
        location: {
            address: "Mountain Peak Road",
            city: "Zermatt",
            country: "Switzerland"
        },
        amenities: ["Ski-in/Ski-out", "Sauna", "Heated Floors", "Home Theater"],
        images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop"],
        maxGuests: 8
    },
    {
        title: "South Luangwa River Safari",
        description: "An exclusive lodge known for the best walking safaris in Africa. Spot leopards and wild dogs right from your dining deck.",
        basePrice: 750.00,
        location: {
            address: "South Luangwa National Park",
            city: "Mfuwe",
            country: "Zambia"
        },
        amenities: ["Walking Safaris", "Outdoor Showers", "Photography Blinds", "Wi-Fi"],
        images: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop"],
        maxGuests: 2
    },
    {
        title: "Amalfi Coast Estate",
        description: "A historic lemon-grove estate converted into a high-end retreat, suspended above the sparkling Mediterranean coastline.",
        basePrice: 1350.00,
        location: {
            address: "Via Costiera",
            city: "Positano",
            country: "Italy"
        },
        amenities: ["Infinity Pool", "Private Beach Access", "Michelin Dining", "Wi-Fi"],
        images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1469&auto=format&fit=crop"],
        maxGuests: 4
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