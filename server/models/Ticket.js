const mongoose = require('mongoose');

const ticketPurchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    ticketType: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
    purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketPurchaseSchema);
