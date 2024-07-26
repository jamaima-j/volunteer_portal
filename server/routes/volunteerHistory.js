const express = require('express');
const Volunteer = require('../models/volunteer');
const Event = require('../models/event');

const router = express.Router();

// Get volunteer history
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('matchedEvents');
    const history = volunteers.flatMap(volunteer => {
      return volunteer.matchedEvents.map(event => {
        if (event) {
          return {
            volunteerName: volunteer.name,
            eventName: event.name,
            description: event.description,
            location: event.location,
            requiredSkills: event.requiredSkills.join(', '),
            urgency: event.urgency,
            date: event.date,
            participationStatus: 'Participated'
          };
        }
        return null;
      }).filter(entry => entry !== null);
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
