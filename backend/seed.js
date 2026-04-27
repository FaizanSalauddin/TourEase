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
        image: 'https://tse4.mm.bing.net/th/id/OIP.Berwi9yZM4WXw59PGu8bLwHaE8?pid=Api&h=220&P=0&w=300',
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
        image: 'https://tse1.mm.bing.net/th/id/OIP.C0Nu6Vo25Ggm4GtiaELg0gHaEK?pid=Api&h=220&P=0',
        description: 'Enjoy snow-capped mountains, adventure sports, and beautiful valleys in the heart of Himalayas.',
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
        image: 'https://tse3.mm.bing.net/th/id/OIP.vp77ZoLIq5Y16L_4H8VpUgHaEM?pid=Api&h=220&P=0',
        description: 'Explore houseboats, beaches, tea gardens, and Kerala culture in God\'s Own Country.',
        itinerary: 'Day 1: Cochin, Day 2: Munnar, Day 3: Thekkady, Day 4: Alleppey Houseboat',
        hotel: 'Premium houseboat + hotel stay',
        included: ['Hotels', 'Breakfast', 'Houseboat stay'],
        excluded: ['Flights', 'Lunch & Dinner'],
        rating: 4.9,
        featured: true
    },
    {
        title: 'Paris Romantic Getaway',
        location: 'Paris, France',
        duration: '4 Days / 3 Nights',
        price: 85000,
        image: 'https://tse3.mm.bing.net/th/id/OIP.83-_WjNl1DdHKSbMALYZxQHaE7?pid=Api&h=220&P=0',
        description: 'Visit the city of love, explore the Eiffel Tower, and enjoy world-class French cuisine.',
        itinerary: 'Day 1: Arrival & Seine Cruise, Day 2: Eiffel Tower & Louvre, Day 3: Montmartre Tour',
        hotel: 'Boutique Hotel in City Centre',
        included: ['Hotel', 'Breakfast', 'City Pass'],
        excluded: ['Flights', 'Visa Fees'],
        rating: 4.8,
        featured: true
    },
    {
        title: 'Dubai Desert Safari',
        location: 'Dubai, UAE',
        duration: '5 Days / 4 Nights',
        price: 45000,
        image: 'https://tse3.mm.bing.net/th/id/OIP.R2cTd9bwjpp47VWYvw59cAHaEo?pid=Api&h=220&P=0',
        description: 'Sky-high skyscrapers, luxury shopping, and thrilling desert dune bashing.',
        itinerary: 'Day 1: Arrival, Day 2: Burj Khalifa & Mall, Day 3: Desert Safari with Dinner',
        hotel: '4-star Luxury Resort',
        included: ['Hotel', 'Breakfast', 'Desert Safari'],
        excluded: ['Flights', 'Visa'],
        rating: 4.7,
        featured: false
    },
    {
        title: 'Bali Tropical Paradise',
        location: 'Bali, Indonesia',
        duration: '7 Days / 6 Nights',
        price: 35000,
        image: 'https://tse2.mm.bing.net/th/id/OIP.5qlOiB6PVUFYyd3owGQjSwHaEK?pid=Api&h=220&P=0',
        description: 'Crystal clear waters, ancient temples, and lush green rice terraces.',
        itinerary: 'Day 1: Ubud, Day 2: Rice Terraces, Day 3: Uluwatu Temple, Day 4: Beach Club',
        hotel: 'Private Pool Villa',
        included: ['Villa stay', 'Breakfast', 'Private Driver'],
        excluded: ['Airfare', 'Personal Expenses'],
        rating: 4.9,
        featured: true
    },
    {
        title: 'Swiss Alps Luxury',
        location: 'Zurich & Lucerne, Switzerland',
        duration: '6 Days / 5 Nights',
        price: 120000,
        image: 'https://tse1.mm.bing.net/th/id/OIP.fVn93i0hhmHGKwfv84aX5QHaET?pid=Api&h=220&P=0',
        description: 'Breathtaking landscapes, snowy peaks, and pristine lakes of Switzerland.',
        itinerary: 'Day 1: Zurich, Day 2: Mt. Titlis, Day 3: Lucerne Lake, Day 4: Interlaken',
        hotel: 'Luxury Alpine Resort',
        included: ['Hotel', 'Swiss Travel Pass', 'Breakfast'],
        excluded: ['Flights', 'Dinner'],
        rating: 5.0,
        featured: true
    },
    {
        title: 'Tokyo Tech & Tradition',
        location: 'Tokyo, Japan',
        duration: '6 Days / 5 Nights',
        price: 95000,
        image: 'https://tse1.mm.bing.net/th/id/OIP.E88KauxVafwKvYbps5COlAHaEO?pid=Api&h=220&P=0',
        description: 'A perfect blend of futuristic technology and ancient Japanese culture.',
        itinerary: 'Day 1: Shinjuku, Day 2: Senso-ji Temple, Day 3: Shibuya Crossing, Day 4: Mt. Fuji',
        hotel: 'Modern City Hotel',
        included: ['Hotel', 'Breakfast', 'Local Guide'],
        excluded: ['Flights', 'Visa'],
        rating: 4.8,
        featured: false
    },
    {
        title: 'Jaipur Royal Heritage',
        location: 'Jaipur, Rajasthan',
        duration: '3 Days / 2 Nights',
        price: 8999,
        image: 'https://tse3.mm.bing.net/th/id/OIP.SaHpJFqtLHF9zS2rf94zhgHaEK?pid=Api&h=220&P=0',
        description: 'Explore the Pink City, majestic forts, and the rich history of Rajputs.',
        itinerary: 'Day 1: Amer Fort, Day 2: Hawa Mahal & City Palace, Day 3: Shopping & Departure',
        hotel: 'Heritage Haveli',
        included: ['Hotel', 'Breakfast', 'Sightseeing'],
        excluded: ['Meals', 'Entry Tickets'],
        rating: 4.5,
        featured: false
    },
    {
        title: 'Maldives Overwater Villa',
        location: 'Maldives',
        duration: '4 Days / 3 Nights',
        price: 55000,
        image: 'https://tse1.mm.bing.net/th/id/OIP.XZO8BL7BQziXqZBZvLZGHwHaDt?pid=Api&h=220&P=0',
        description: 'Relax in a luxury villa over the turquoise ocean water.',
        itinerary: 'Day 1: Speedboat Transfer, Day 2: Snorkeling, Day 3: Spa & Relaxation',
        hotel: 'Luxury Water Villa',
        included: ['All Meals', 'Transfers', 'Villa stay'],
        excluded: ['Flights', 'Tips'],
        rating: 4.9,
        featured: true
    },
    {
        title: 'Ladakh High Pass',
        location: 'Leh, Ladakh',
        duration: '7 Days / 6 Nights',
        price: 25000,
        image: 'https://tse1.mm.bing.net/th/id/OIP.lciq0AOZrz2P5hdwouGH7QAAAA?pid=Api&h=220&P=0',
        description: 'Adventure of a lifetime in the cold desert with Pangong Lake and high passes.',
        itinerary: 'Day 1: Acclimatization, Day 2: Leh Sightseeing, Day 3: Nubra Valley, Day 4: Pangong Lake',
        hotel: 'Deluxe Camps & Hotels',
        included: ['Hotels/Camps', 'Breakfast & Dinner', 'Permits'],
        excluded: ['Flights', 'Oxygen Cylinders'],
        rating: 4.7,
        featured: true
    },
    {
        title: 'New York City Lights',
        location: 'New York, USA',
        duration: '5 Days / 4 Nights',
        price: 110000,
        image: 'https://tse3.mm.bing.net/th/id/OIP.VhRF701LMw1ccVBsiXt2ewHaEK?pid=Api&h=220&P=0',
        description: 'The city that never sleeps. Times Square, Central Park, and Statue of Liberty.',
        itinerary: 'Day 1: Times Square, Day 2: Statue of Liberty, Day 3: Central Park & Empire State',
        hotel: 'Manhattan Boutique Hotel',
        included: ['Hotel', 'City Tour', 'Airport Pickup'],
        excluded: ['Flights', 'Visa', 'Meals'],
        rating: 4.6,
        featured: false
    },
    {
        title: 'Singapore City Modern',
        location: 'Singapore',
        duration: '4 Days / 3 Nights',
        price: 38000,
        image: 'https://tse1.mm.bing.net/th/id/OIP.q0UrbTrDKUPRwigxjdkYSgHaEK?pid=Api&h=220&P=0',
        description: 'Modern marvels, Gardens by the Bay, and Sentosa Island fun.',
        itinerary: 'Day 1: Gardens by the Bay, Day 2: Universal Studios, Day 3: Sentosa & Marina Bay',
        hotel: '4-star City Hotel',
        included: ['Hotel', 'Breakfast', 'Entry Tickets'],
        excluded: ['Flights', 'Visa'],
        rating: 4.7,
        featured: false
    },
    {
        title: 'Andaman Island Escape',
        location: 'Havelock, Andaman',
        duration: '6 Days / 5 Nights',
        price: 28000,
        image: 'https://tse3.mm.bing.net/th/id/OIP.i3awrDQgV2FeQugstDF7swHaER?pid=Api&h=220&P=0',
        description: 'White sand beaches and world-class scuba diving spots.',
        itinerary: 'Day 1: Port Blair, Day 2: Havelock, Day 3: Radhanagar Beach, Day 4: Scuba Diving',
        hotel: 'Beachfront Resort',
        included: ['Hotel', 'Breakfast', 'Ferry Transfers'],
        excluded: ['Airfare', 'Water Sports Cost'],
        rating: 4.8,
        featured: true
    },
    {
        title: 'London Classic Tour',
        location: 'London, UK',
        duration: '5 Days / 4 Nights',
        price: 98000,
        image: 'https://tse4.mm.bing.net/th/id/OIP.b2J-4bhNw1EQ7_HGxxOP2AHaDt?pid=Api&h=220&P=0',
        description: 'Historical landmarks, Big Ben, and the royal vibes of London.',
        itinerary: 'Day 1: Big Ben & Eye, Day 2: Buckingham Palace, Day 3: Tower Bridge',
        hotel: 'Classic English Hotel',
        included: ['Hotel', 'Breakfast', 'Hop-on Hop-off Bus'],
        excluded: ['Flights', 'Lunch/Dinner'],
        rating: 4.6,
        featured: false
    },
    {
        title: 'Varanasi Spiritual Journey',
        location: 'Varanasi, India',
        duration: '3 Days / 2 Nights',
        price: 7500,
        image: 'https://tse1.mm.bing.net/th/id/OIP.lvfF4jVkl7aR09tFtlXQSAHaEK?pid=Api&h=220&P=0',
        description: 'Experience the deep spirituality and Ganga Aarti in one of the world\'s oldest cities.',
        itinerary: 'Day 1: Ganga Aarti, Day 2: Sarnath Tour, Day 3: Morning Boat Ride',
        hotel: 'Ganga View Hotel',
        included: ['Hotel', 'Breakfast', 'Boat Ride'],
        excluded: ['Personal Expenses'],
        rating: 4.9,
        featured: false
    },
    {
        title: 'Sydney Harbour View',
        location: 'Sydney, Australia',
        duration: '6 Days / 5 Nights',
        price: 135000,
        image: 'https://tse2.mm.bing.net/th/id/OIP.oba0KmPi9kZQLP14BEbs0wHaE7?pid=Api&h=220&P=0',
        description: 'Explore the Sydney Opera House and the beautiful Bondi Beach.',
        itinerary: 'Day 1: Opera House, Day 2: Bondi Beach, Day 3: Blue Mountains',
        hotel: 'Luxury Harbour Hotel',
        included: ['Hotel', 'Breakfast', 'Mountain Tour'],
        excluded: ['Flights', 'Visa'],
        rating: 4.8,
        featured: false
    },
    {
        title: 'Agra Taj Mahal Special',
        location: 'Agra, India',
        duration: '2 Days / 1 Night',
        price: 4999,
        image: 'https://tse1.mm.bing.net/th/id/OIP.IixZhpIjd0nk_PMF1FdYbgHaEo?pid=Api&h=220&P=0',
        description: 'Witness the symbol of love and the architectural brilliance of Mughals.',
        itinerary: 'Day 1: Taj Mahal & Agra Fort, Day 2: Fatehpur Sikri',
        hotel: '3-star Hotel near Taj',
        included: ['Hotel', 'Breakfast', 'Guide'],
        excluded: ['Entry Fees'],
        rating: 4.5,
        featured: false
    },
    {
        title: 'Rome Ancient Wonders',
        location: 'Rome, Italy',
        duration: '5 Days / 4 Nights',
        price: 88000,
        image: 'https://tse1.mm.bing.net/th/id/OIP.RSHjEUL9qhuTe3TO7o3lcwHaET?pid=Api&h=220&P=0',
        description: 'Step back in history with the Colosseum and the Vatican City.',
        itinerary: 'Day 1: Colosseum, Day 2: Vatican Museum, Day 3: Trevi Fountain',
        hotel: 'Boutique City Hotel',
        included: ['Hotel', 'Breakfast', 'Walking Tour'],
        excluded: ['Flights', 'Visa'],
        rating: 4.7,
        featured: true
    },
    {
        title: 'Kashmir Valley Paradise',
        location: 'Srinagar, Kashmir',
        duration: '6 Days / 5 Nights',
        price: 22000,
        image: 'https://tse3.mm.bing.net/th/id/OIP.XGk66VtMAAYnTq-NfBbm9AHaD0?pid=Api&h=220&P=0',
        description: 'Shikara rides on Dal Lake and the serene beauty of Gulmarg.',
        itinerary: 'Day 1: Dal Lake, Day 2: Gulmarg, Day 3: Pahalgam, Day 4: Sonamarg',
        hotel: 'Luxury Houseboat + Hotel',
        included: ['Houseboat Stay', 'Breakfast & Dinner', 'Transfers'],
        excluded: ['Flights', 'Adventure Activities'],
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