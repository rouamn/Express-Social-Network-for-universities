// routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');

// Create a new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single event
router.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

// Update an event
router.patch('/:id', getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title;
  }
  if (req.body.description != null) {
    res.event.description = req.body.description;
  }
  if (req.body.date != null) {
    res.event.date = req.body.date;
  }
  if (req.body.location != null) {
    res.event.location = req.body.location;
  }
  if (req.body.creator != null) {
    res.event.creator = req.body.creator;
  }
  if (req.body.attendees != null) {
    res.event.attendees = req.body.attendees;
  }
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an event
router.delete('/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get event by ID
async function getEvent(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.event = event;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
