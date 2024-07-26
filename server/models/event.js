const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  urgency: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  eventDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);
