const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
  socketTimeoutMS: 45000 // 45 seconds timeout
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => console.error('Could not connect to MongoDB:', error));

// Import routes
const eventsRoute = require('./routes/events');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');
<<<<<<< Updated upstream
const profileRoute = require('./routes/profile');
const notificationsRoute = require('./routes/notifications');
=======
const matchingRoute = require('./routes/matching');
const volunteerHistoryRoute = require('./routes/volunteerHistory');
>>>>>>> Stashed changes

// Use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
<<<<<<< Updated upstream
app.use('/profile', profileRoute);
app.use('/notifications', notificationsRoute);
=======
app.use('/matching', matchingRoute);
app.use('/volunteerHistory', volunteerHistoryRoute);

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});
>>>>>>> Stashed changes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
