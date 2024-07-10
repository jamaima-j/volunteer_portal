const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001; //running on 5001 bc my computer won't run on 5000

app.use(express.json());
app.use(cors());

//imports routes
const eventsRoute = require('./routes/events');
const registrationRoute = require('./routes/registration');
const loginRoute = require('./routes/login');

//uses routes
app.use('/admin/events', eventsRoute);
app.use('/auth', registrationRoute);
app.use('/auth', loginRoute);

//tests route, should see correct port if running
app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
