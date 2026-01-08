const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ticket = require('./models/Ticket');

dotenv.config();

const resetTickets = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado a MongoDB...');

        await Ticket.deleteMany({});
        console.log('🗑️ Todos los boletos han sido eliminados.');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetTickets();
