const express = require('express');
const { purchaseTicket, getMyTickets, getAttendeesByEvent, getSalesStats } = require('../controllers/ticketController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/purchase', authMiddleware, purchaseTicket);
router.get('/my-tickets', authMiddleware, getMyTickets);
router.get('/event/:eventId', authMiddleware, adminMiddleware, getAttendeesByEvent);
router.get('/stats', authMiddleware, adminMiddleware, getSalesStats);

module.exports = router;
