const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'TicketSync API is running' });
});

console.log('🔌 Intentando conectar a MongoDB en:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5 segundos de timeout
})
    .then(() => {
        console.log('✅ MongoDB Connected con éxito.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor TicketSync corriendo en puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ ERROR CRÍTICO DE CONEXIÓN A DB:');
        console.error('Mensaje:', err.message);
        console.error('¿Está MongoDB corriendo localmente? Intenta abrir MongoDB Compass o ejecutar "mongod"');
        process.exit(1);
    });
