const express = require('express');
const User = require('../models/User');
const Event = require('../models/event');

const router = express.Router();

// Get volunteer history
router.get('/', async (req, res) => {
  try {
    const volunteers = await User.find({ accountType: 'volunteer' }).populate('matchedEvents');
    const history = volunteers.flatMap(volunteer => {
      return volunteer.matchedEvents.map(event => {
        return {
          volunteerName: volunteer.fullName,
          eventName: event.name,
          description: event.description,
          location: event.location,
          requiredSkills: Array.isArray(event.requiredSkills) ? event.requiredSkills : [],
          urgency: event.urgency,
          date: event.eventDate,
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
