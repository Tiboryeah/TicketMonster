const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const events = [
    {
        title: "Juan Gabriel en Bellas Artes - La Historia",
        description: "Revive el legendario concierto de Juan Gabriel en el Palacio de Bellas Artes. Una proyección exclusiva y homenaje con orquesta en vivo interpretando sus mayores éxitos como 'Amor Eterno', 'Querida' y 'El Noa Noa'. Una experiencia inolvidable para todos los amantes de 'El Divo de Juárez'.",
        date: new Date('2024-11-02T20:00:00'),
        location: "Palacio de Bellas Artes, CDMX",
        category: "Concierto",
        image: "/uploads/juangabriel.png",
        tickets: [
            { name: "Luneta", price: 1500, stock: 100, sold: 0 },
            { name: "Anfiteatro", price: 900, stock: 200, sold: 0 },
            { name: "Galería", price: 500, stock: 300, sold: 0 }
        ]
    },
    {
        title: "El Rey León - El Musical",
        description: "El aclamado musical de Broadway llega a la ciudad. Con disfraces impresionantes, marionetas innovadoras y la música inolvidable de Elton John y Tim Rice. Únete a Simba en su viaje épico desde cachorro hasta Rey de la Sabana.",
        date: new Date('2024-10-15T19:00:00'),
        location: "Teatro Telcel, CDMX",
        category: "Teatro",
        image: "/uploads/reyleon.png",
        tickets: [
            { name: "VIP Gold", price: 3500, stock: 50, sold: 0 },
            { name: "Orquesta", price: 2200, stock: 150, sold: 0 },
            { name: "Mezzanine", price: 1800, stock: 150, sold: 0 }
        ]
    },
    {
        title: "Gran Final de Copa: Internacional vs Local",
        description: "La emoción del fútbol en su máxima expresión. Disfruta de la gran final de copa donde las estrellas del deporte rey se enfrentarán en un duelo titánico por el campeonato. Ambiente familiar, seguridad garantizada y la pasión de la hinchada.",
        date: new Date('2024-12-05T18:00:00'),
        location: "Estadio Azteca, CDMX",
        category: "Deportes",
        image: "/uploads/soccer.jpg",
        tickets: [
            { name: "Palco Club", price: 5000, stock: 20, sold: 0 },
            { name: "Platea Baja", price: 1200, stock: 500, sold: 0 },
            { name: "Cabecera", price: 600, stock: 1000, sold: 0 }
        ]
    },
    {
        title: "Conferencia Gratuita: IA y Negocios",
        description: "Aprende cómo la Inteligencia Artificial está revolucionando el mundo de los negocios y las redes sociales. Ponentes expertos de Google y líderes de la industria compartirán estrategias para hacer crecer tu empresa en la era digital.",
        date: new Date('2024-09-20T10:00:00'),
        location: "Centro Citibanamex, CDMX",
        category: "Conferencia",
        image: "/uploads/conferencia.jpg",
        tickets: [
            { name: "Acceso General", price: 0, stock: 500, sold: 0 },
            { name: "Workshop VIP", price: 800, stock: 50, sold: 0 }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB...');

        // Limpiar eventos existentes para evitar duplicados en esta demo
        await Event.deleteMany({});
        console.log('🧹 Eventos anteriores eliminados...');

        // Insertar nuevos eventos
        await Event.insertMany(events);
        console.log('🎉 4 Nuevos Eventos insertados correctamente.');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
