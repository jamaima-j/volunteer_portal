const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  urgency: { type: String, required: true },
  date: { type: Date, required: true },
  volunteers: { type: [mongoose.Schema.Types.ObjectId], ref: 'Volunteer' }
});

module.exports = mongoose.model('Event', eventSchema);
