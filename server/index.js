// server/index.js
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// In-memory data storage with initial values
const volunteers = [
  { id: uuidv4(), name: "John Doe", skills: ["Skill 1", "Skill 2"], availability: "Weekends", matchedEvents: [] },
  { id: uuidv4(), name: "Jane Smith", skills: ["Skill 3", "Skill 4"], availability: "Weekdays", matchedEvents: [] }
];

const events = [
  { id: uuidv4(), name: "Community Clean-Up", description: "Cleaning up the park", location: "Central Park", requiredSkills: ["Skill 1"], urgency: "High", date: "2024-07-20", volunteers: [] },
  { id: uuidv4(), name: "Food Drive", description: "Collecting and distributing food", location: "Community Center", requiredSkills: ["Skill 2"], urgency: "Medium", date: "2024-08-15", volunteers: [] }
];

const notifications = [];

// Routes
app.get('/admin/events', (req, res) => {
  res.json(events);
});

app.post('/admin/events', (req, res) => {
  const event = { id: uuidv4(), ...req.body };
  events.push(event);
  res.status(201).json(event);
});

app.put('/admin/events/:id', (req, res) => {
  const eventId = req.params.id;
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events[eventIndex] = { id: eventId, ...req.body };
  res.json(events[eventIndex]);
});

app.delete('/admin/events/:id', (req, res) => {
  const eventId = req.params.id;
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }

  events.splice(eventIndex, 1);
  res.json({ message: 'Event deleted' });
});

// Notification Routes
app.get('/notifications', (req, res) => {
  res.json(notifications);
});

app.post('/notifications', (req, res) => {
  const notification = { id: uuidv4(), ...req.body };
  notifications.push(notification);
  res.status(201).json(notification);
});

app.delete('/notifications/:id', (req, res) => {
  const notificationId = req.params.id;
  const notificationIndex = notifications.findIndex(n => n.id === notificationId);

  if (notificationIndex === -1) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notifications.splice(notificationIndex, 1);
  res.json({ message: 'Notification deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
