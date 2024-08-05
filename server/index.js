const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Print the MONGODB_URI to verify it's being read correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });

// Import routes
const eventsRoute = require('./routes/events');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');
const matchingRoute = require('./routes/matching');
const volunteerHistoryRoute = require('./routes/volunteerHistory');
const statesRoute = require('./routes/states');
const profileRoute = require('./routes/profile');
const reportingRoute = require('./routes/reporting');

// Use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
app.use('/matching', matchingRoute);
app.use('/volunteerHistory', volunteerHistoryRoute);
app.use('/states', statesRoute);
app.use('/profile', profileRoute);
app.use('/admin/reporting', reportingRoute);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
