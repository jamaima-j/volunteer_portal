const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const states = require('./routes/states');



const app = express();
const PORT = 5000;

//middleware
app.use(express.json());
app.use(cors());
app.use('/states', states);

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
const matchingRoute = require('./routes/matching');
const volunteerHistoryRoute = require('./routes/volunteerHistory');

//use routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);
app.use('/matching', matchingRoute);
app.use('/volunteerHistory', volunteerHistoryRoute);

//test route
app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

__________________________________________________________________________
client/server/models/State.js

const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('State', StateSchema);

___________________________________________________________________________

client/server/routes/states.js

const express = require('express');
const router = express.Router();
const State = require('../models/State');

//gets all states
router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
