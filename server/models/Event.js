const mongoose = require('mongoose');

const ticketTypeSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., 'VIP', 'General'
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    sold: { type: Number, default: 0 }
});

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    tickets: [ticketTypeSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
