const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ticket = require('./models/Ticket');
const Event = require('./models/Event');

dotenv.config();

const check = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const tickets = await Ticket.find();
    console.log('Total Ticket documents:', tickets.length);
    const totalQty = tickets.reduce((acc, t) => acc + t.quantity, 0);
    console.log('Sum of quantity in Tickets:', totalQty);

    const events = await Event.find();
    const eventSold = events.reduce((acc, e) => {
        return acc + e.tickets.reduce((st, t) => st + t.sold, 0);
    }, 0);
    console.log('Sum of sold in Events:', eventSold);

    process.exit();
};

check();
