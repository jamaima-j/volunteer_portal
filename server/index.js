const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

//middleware
app.use(express.json());
app.use(cors());

//print the MONGODB_URI to verify it's being read correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);

//mongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });

//import routes
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

//use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
<<<<<<< Updated upstream
app.use('/profile', profileRoute);
app.use('/notifications', notificationsRoute);
=======
app.use('/matching', matchingRoute);
app.use('/volunteerHistory', volunteerHistoryRoute);

//test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});
>>>>>>> Stashed changes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
