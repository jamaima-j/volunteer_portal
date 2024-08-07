const express = require('express');
const User = require('../models/User');
const Event = require('../models/event');
const Notification = require('../models/notification');
const mongoose = require('mongoose');

const router = express.Router();

// Get all volunteers
router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await User.find({ accountType: 'volunteer' });
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
  const { fullName, email, selectedSkills, availability } = req.body;
  try {
    const volunteer = new User({ 
      fullName, 
      email, 
      selectedSkills, 
      availability, 
      accountType: 'volunteer',
      matchedEvents: [],
      password: 'defaultpassword', // Default password
      profileComplete: true
    });
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
  // Add console logs to verify IDs
  //console.log('Received volunteerId:', volunteerId);
  //console.log('Received eventId:', eventId);

  try {
    const volunteer = await User.findById(volunteerId);
    //console.log('Volunteer found:', volunteer);
    
    const event = await Event.findById(eventId);
    //console.log('Event found:', event);

    if (!volunteer || !event) {
      return res.status(404).json({ message: 'Volunteer or Event not found' });
    }

    // Check if the event is already in the matchedEvents array
    if (!volunteer.matchedEvents.some(event => event.equals(eventId))) {
      volunteer.matchedEvents.push(eventId);
    }
  
    // Check if the volunteer is already in the event's volunteers array
    if (!event.volunteers.some(volunteer => volunteer.equals(volunteerId))) {
      event.volunteers.push(volunteerId);
    }

    await volunteer.save();
    await event.save();

    const notification = new Notification({
      type: 'Matching',
      title: 'Volunteer Matched',
      message: `Volunteer ${volunteer.fullName} has been matched to event ${event.name}.`,
      event_id: event._id,
      event_name: event.name
    });
    await notification.save();

    res.status(200).json({ message: 'Volunteer matched to event successfully' });
  } catch (error) {
    //console.log('Error matching volunteer to event:', error);
    res.status(400).json({ message: 'Error matching volunteer to event', error });
  }
});

module.exports = router;
