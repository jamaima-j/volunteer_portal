const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
=======
const dotenv = require('dotenv');

dotenv.config();
>>>>>>> 1c8ca4bf1693161c343141d61e0432d0b9a72a09

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/volunteer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
  socketTimeoutMS: 45000 // 45 seconds timeout
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => console.error('Could not connect to MongoDB:', error));
=======
// Print the MONGODB_URI to verify it's being read correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });
>>>>>>> 1c8ca4bf1693161c343141d61e0432d0b9a72a09

// Import routes
const eventsRoute = require('./routes/events');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');
<<<<<<< HEAD
const profileRoute = require('./routes/profile');
const notificationsRoute = require('./routes/notifications');
=======
>>>>>>> 1c8ca4bf1693161c343141d61e0432d0b9a72a09

// Use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
<<<<<<< HEAD
app.use('/profile', profileRoute);
app.use('/notifications', notificationsRoute);
=======

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});
>>>>>>> 1c8ca4bf1693161c343141d61e0432d0b9a72a09

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
