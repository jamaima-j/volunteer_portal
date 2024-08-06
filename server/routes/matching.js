const express = require('express');
const Volunteer = require('../models/Volunteer');
const Event = require('../models/event');
const Notification = require('../models/notification'); // Import the Notification model

const router = express.Router();

// Get all volunteers
router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteers', error });
  }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Add a new volunteer
router.post('/volunteers', async (req, res) => {
  const { name, email, skills, availability } = req.body;
  try {
    const volunteer = new Volunteer({ name, email, skills, availability, matchedEvents: [] });
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(400).json({ message: 'Error adding volunteer', error });
  }
});

// Add a new event
router.post('/events', async (req, res) => {
  const { name, description, location, requiredSkills, urgency, eventDate } = req.body;
  try {
    const event = new Event({ name, description, location, requiredSkills, urgency, eventDate, volunteers: [] });
    await event.save();

    // Create a notification for the new event
    const notification = new Notification({
      type: 'Event',
      title: `New Event Added: ${event.name}`,
      message: `A new event named ${event.name} has been added.`,
      event_id: event._id,
      event_name: event.name
    });
    await notification.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error adding event', error });
  }
});

// Match volunteer to an event
router.post('/match', async (req, res) => {
  const { volunteerId, eventId } = req.body;
  try {
    const volunteer = await Volunteer.findById(volunteerId);
    const event = await Event.findById(eventId);

    if (!volunteer || !event) {
      return res.status(404).json({ message: 'Volunteer or Event not found' });
    }

    volunteer.matchedEvents.push(eventId);
    event.volunteers.push(volunteerId);

    await volunteer.save();
    await event.save();

    // Create a notification for the volunteer match
    const notification = new Notification({
      type: 'Matching',
      title: 'Volunteer Matched',
      message: `Volunteer ${volunteer.name} has been matched to event ${event.name}.`,
      event_id: event._id,
      event_name: event.name
    });
    await notification.save();

    res.status(200).json({ message: 'Volunteer matched to event successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error matching volunteer to event', error });
  }
});

module.exports = router;
