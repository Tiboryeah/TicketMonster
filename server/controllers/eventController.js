const Event = require('../models/Event');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, tickets } = req.body;
        const event = new Event({
            title,
            description,
            date,
            location,
            category,
            tickets: JSON.parse(tickets),
            createdBy: req.user.id,
            image: req.file ? `/uploads/${req.file.filename}` : ''
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { title, description, date, location, category, tickets } = req.body;
        const updateData = {
            title,
            description,
            date,
            location,
            category,
            tickets: JSON.parse(tickets)
        };
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }
        const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
