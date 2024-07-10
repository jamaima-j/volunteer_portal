const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// In-memory data storage with initial values
const volunteers = [
  { id: 1, name: "John Doe", skills: ["Skill 1", "Skill 2"], availability: "Weekends", matchedEvents: [] },
  { id: 2, name: "Jane Smith", skills: ["Skill 3", "Skill 4"], availability: "Weekdays", matchedEvents: [] }
];

const events = [
  { id: 1, name: "Community Clean-Up", description: "Cleaning up the park", location: "Central Park", requiredSkills: ["Skill 1"], urgency: "High", date: "2024-07-20", volunteers: [] },
  { id: 2, name: "Food Drive", description: "Collecting and distributing food", location: "Community Center", requiredSkills: ["Skill 2"], urgency: "Medium", date: "2024-08-15", volunteers: [] }
];
// Import routes
const eventsRoute = require('./routes/events');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile'); 
const matchingRoute = require('./routes/matching')(volunteers, events);
const volunteerHistoryRoute = require('./routes/volunteerHistory')(volunteers, events);


// Use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
app.use('/profile', profileRoute); 
app.use('/matching', matchingRoute);
app.use('/volunteerHistory', volunteerHistoryRoute);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
