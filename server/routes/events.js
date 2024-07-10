const express = require('express');
const router = express.Router();

let events = [
  { id: 1, name: 'Event 1', description: 'Description 1', location: 'Location 1', skills: ['Skill 1'], urgency: 'low', date: '2023-07-09' },
  //add more events as needed
];

//get all events with get
router.get('/', (req, res) => {
  res.json(events);
});

//create new event
router.post('/', (req, res) => {
  const newEvent = { ...req.body, id: events.length + 1 };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

//update event
router.put('/:id', (req, res) => {
  const eventIndex = events.findIndex(event => event.id == req.params.id);
  if (eventIndex !== -1) {
    events[eventIndex] = { ...events[eventIndex], ...req.body };
    res.json(events[eventIndex]);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

//delete event
router.delete('/:id', (req, res) => {
  events = events.filter(event => event.id != req.params.id);
  res.json({ message: 'Event deleted' });
});

module.exports = router;
