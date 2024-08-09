const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Notification = require('../models/notification'); // Import the Notification model

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();

    // Create a notification for the new event
    const notification = new Notification({
      type: 'Event',
      title: `New Event Added: ${newEvent.name}`,
      message: `A new event named ${newEvent.name} has been added.`,
      event_id: newEvent._id,
      event_name: newEvent.name
    });
    await notification.save();

    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    Object.assign(event, req.body);
    const updatedEvent = await event.save();

    // Create a notification for the event update
    const notification = new Notification({
      type: 'Event',
      title: `Event Updated: ${updatedEvent.name}`,
      message: `The event ${updatedEvent.name} has been updated.`,
      event_id: updatedEvent._id,
      event_name: updatedEvent.name
    });
    await notification.save();

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Delete the event
    await Event.findByIdAndDelete(req.params.id);
    
    // Delete notifications related to this event
    await Notification.deleteMany({ event_id: req.params.id });
    
    res.status(200).json({ message: 'Event and related notifications deleted' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
