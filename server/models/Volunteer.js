// models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  availability: { type: String, required: true },
  matchedEvents: { type: [mongoose.Schema.Types.ObjectId], ref: 'Event' }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);


