const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function resetUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a Atlas...');

        // Esto solo borra los usuarios de la base de datos 'ticket-system'
        // No toca 'sistema_reporte'
        await mongoose.connection.db.collection('users').deleteMany({});

        console.log('✅ Usuarios reseteados. Ya puedes registrarte de nuevo.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

resetUsers();
