// backend/seed.js
// Run this script once to populate the database with sample data
// Command: node seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('./models/User');
const Package = require('./models/Package');
const Booking = require('./models/Booking');

// Sample tour packages data
const samplePackages = [
    {
        title: 'Goa Beach Delight',
        location: 'Goa, India',
        duration: '5 Days / 4 Nights',
        price: 14999,
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
        description: 'Experience the golden beaches, vibrant nightlife, and Portuguese heritage of India’s most beloved coastal destination.',
        itinerary: 'Day 1: Arrival, Day 2: North Goa Tour, Day 3: South Goa Tour, Day 4: Water Sports, Day 5: Departure',
        hotel: '3-star hotel near Calangute Beach',
        included: ['Hotel accommodation', 'Breakfast', 'Airport transfers'],
        excluded: ['Airfare', 'Lunch & Dinner', 'Personal expenses'],
        rating: 4.7,
        featured: true
    },
    {
        title: 'Manali Snow Adventure',
        location: 'Manali, Himachal Pradesh',
        duration: '6 Days / 5 Nights',
        price: 16999,
        image: 'https://images.unsplash.com/photo-1585236905122-4e33a5c5bfe0?w=800&q=80',
        description: 'Enjoy snow-capped mountains, adventure sports, and beautiful valleys.',
        itinerary: 'Day 1: Arrival, Day 2: Solang Valley, Day 3: Rohtang Pass, Day 4: Local Sightseeing',
        hotel: '3-star hotel with mountain view',
        included: ['Hotel', 'Breakfast', 'Sightseeing'],
        excluded: ['Transport', 'Lunch & Dinner'],
        rating: 4.6,
        featured: true
    },
    {
        title: 'Kerala Backwaters Bliss',
        location: 'Kerala, India',
        duration: '6 Days / 5 Nights',
        price: 18999,
        image: 'https://images.unsplash.com/photo-1600100397608-4c1a7a25e6dd?w=800&q=80',
        description: 'Explore houseboats, beaches, tea gardens, and Kerala culture.',
        itinerary: 'Day 1: Cochin, Day 2: Munnar, Day 3: Thekkady, Day 4: Alleppey Houseboat',
        hotel: 'Premium houseboat + hotel stay',
        included: ['Hotels', 'Breakfast', 'Houseboat stay'],
        excluded: ['Flights', 'Lunch & Dinner'],
        rating: 4.9,
        featured: true
    }
];

// Seed Database Function
async function seedDatabase() {
    try {
        // MongoDB connect
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear old data
        await User.deleteMany({});
        await Package.deleteMany({});
        await Booking.deleteMany({});
        console.log('🗑 Existing data cleared');

        // Create Admin User
        // Password will auto hash from User model pre-save hook
        await User.create({
            name: 'Admin User',
            email: 'admin@tourease.in',
            password: 'admin123',
            isAdmin: true
        });

        console.log('👤 Admin created → admin@tourease.in / admin123');

        // Create Normal User
        await User.create({
            name: 'Demo User',
            email: 'user@tourease.in',
            password: 'user123',
            isAdmin: false
        });

        console.log('👤 Demo User created → user@tourease.in / user123');

        // Insert Tour Packages
        const packages = await Package.insertMany(samplePackages);
        console.log(`📦 ${packages.length} tour packages added`);

        console.log('\n✅ Database seeded successfully!');
        console.log('======================================');
        console.log('Admin Login : admin@tourease.in / admin123');
        console.log('User Login  : user@tourease.in / user123');
        console.log('======================================\n');

        process.exit();
    } catch (error) {
        console.log('❌ Error:', error.message);
        process.exit(1);
    }
}

seedDatabase();