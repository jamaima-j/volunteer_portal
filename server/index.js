const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Import routes
const eventsRoute = require('./routes/events');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile'); 

// Use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
app.use('/profile', profileRoute); 

// Test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
