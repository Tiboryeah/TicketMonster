const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Event.deleteMany({});
        console.log('Cleared events');

        const events = [
            {
                title: 'Neon Night Festival 2026',
                description: 'Una experiencia audiovisual inigualable con los mejores DJs del mundo en un entorno futurista.',
                date: new Date('2026-05-15'),
                location: 'Ciudad de México, Foro Sol',
                category: 'Concierto',
                image: '', // Placeholder
                tickets: [
                    { name: 'General', price: 1200, stock: 500 },
                    { name: 'VIP', price: 2500, stock: 100 }
                ]
            },
            {
                title: 'Copa de Campeones: Final',
                description: 'El evento deportivo más esperado del año. Los dos mejores equipos cara a cara.',
                date: new Date('2026-06-20'),
                location: 'Monterrey, Estadio BBVA',
                category: 'Deportes',
                image: '',
                tickets: [
                    { name: 'Tribuna Sur', price: 800, stock: 1000 },
                    { name: 'Platea', price: 3500, stock: 200 }
                ]
            }
        ];

        await Event.insertMany(events);
        console.log('Seeded events successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
