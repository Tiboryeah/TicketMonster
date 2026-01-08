const express = require('express');
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createEvent);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateEvent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEvent);

module.exports = router;
