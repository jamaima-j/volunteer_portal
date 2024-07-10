const express = require('express');

module.exports = (volunteers, events) => {
  const router = express.Router();

  // Get volunteer history
  router.get('/', (req, res) => {
    const history = volunteers.flatMap(volunteer => {
      return volunteer.matchedEvents.map(eventId => {
        const event = events.find(e => e.id === eventId);
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
  });

  return router;
};
