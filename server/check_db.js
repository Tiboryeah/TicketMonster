const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

async function checkDB() {
    try {
        console.log('Intentando conectar a:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conexión exitosa a MongoDB.');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Colecciones encontradas:', collections.map(c => c.name));

        const User = mongoose.model('User', new mongoose.Schema({}));
        const Event = mongoose.model('Event', new mongoose.Schema({}));

        const userCount = await mongoose.connection.db.collection('users').countDocuments();
        const eventCount = await mongoose.connection.db.collection('events').countDocuments();

        console.log(`📊 Usuarios en BD: ${userCount}`);
        console.log(`📊 Eventos en BD: ${eventCount}`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Error de conexión o consulta:', err.message);
        process.exit(1);
    }
}

checkDB();
