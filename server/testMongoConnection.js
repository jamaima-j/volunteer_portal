require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/volunteer';
console.log(`Connecting to MongoDB at ${uri}`);

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });
