const express = require('express');

module.exports = (volunteers, events) => {
  const router = express.Router();

  // Get all volunteers
  router.get('/volunteers', (req, res) => {
    res.json(volunteers);
  });

  // Get all events
  router.get('/events', (req, res) => {
    res.json(events);
  });

  // Add a new volunteer
  router.post('/volunteers', (req, res) => {
    const volunteer = {
      id: volunteers.length + 1,
      name: req.body.name,
      skills: req.body.skills,
      availability: req.body.availability,
      matchedEvents: []
    };
    volunteers.push(volunteer);
    res.status(201).json(volunteer);
  });

  // Add a new event
  router.post('/events', (req, res) => {
    const event = {
      id: events.length + 1,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      requiredSkills: req.body.requiredSkills,
      urgency: req.body.urgency,
      date: req.body.date,
      volunteers: []
    };
    events.push(event);
    res.status(201).json(event);
  });

  // Match volunteer to an event
  router.post('/match', (req, res) => {
    const { volunteerId, eventId } = req.body;
    const volunteer = volunteers.find(v => v.id === parseInt(volunteerId));
    const event = events.find(e => e.id === parseInt(eventId));

    if (!volunteer || !event) {
      return res.status(404).json({ message: 'Volunteer or Event not found' });
    }

    volunteer.matchedEvents.push(eventId);
    event.volunteers.push(volunteerId);

    res.status(200).json({ message: 'Volunteer matched to event successfully' });
  });

  return router;
};
