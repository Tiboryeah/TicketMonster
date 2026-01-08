const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

const purchaseTicket = async (req, res) => {
    try {
        const { eventId, ticketType, quantity, totalPrice } = req.body;
        const userId = req.user.id;

        // Find event and check stock
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const typeIndex = event.tickets.findIndex(t => t.name === ticketType);
        if (typeIndex === -1) return res.status(400).json({ message: 'Ticket type not found' });

        if (event.tickets[typeIndex].stock < quantity) {
            return res.status(400).json({ message: 'Not enough tickets available' });
        }

        // Update stock and sold count
        event.tickets[typeIndex].stock -= quantity;
        event.tickets[typeIndex].sold += quantity;
        await event.save();

        // Create ticket/order
        const ticket = await Ticket.create({
            userId,
            eventId,
            ticketType,
            quantity,
            totalPrice,
            status: 'confirmed'
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ userId: req.user.id }).populate('eventId');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAttendeesByEvent = async (req, res) => {
    try {
        const tickets = await Ticket.find({ eventId: req.params.eventId }).populate('userId', 'name email');
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSalesStats = async (req, res) => {
    try {
        const totalTickets = await Ticket.countDocuments();
        const totalRevenue = await Ticket.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const recentSales = await Ticket.find().sort({ purchaseDate: -1 }).limit(5).populate('userId', 'name').populate('eventId', 'title');
        const uniqueBuyers = await Ticket.distinct('userId');

        res.json({
            totalTickets,
            totalRevenue: totalRevenue[0] ? totalRevenue[0].total : 0,
            uniqueBuyers: uniqueBuyers.length,
            recentSales
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { purchaseTicket, getMyTickets, getAttendeesByEvent, getSalesStats };
