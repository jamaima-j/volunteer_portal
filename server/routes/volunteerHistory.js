const express = require('express');
const Volunteer = require('../models/Volunteer');
const Event = require('../models/event');

const router = express.Router();

// Get volunteer history
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('matchedEvents');
    const history = volunteers.flatMap(volunteer => {
      return volunteer.matchedEvents.map(event => {
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
      });
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
