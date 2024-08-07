const mongoose = require('mongoose');
const Notification = require('./notification'); // Ensure correct path

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
    enum: ['low', 'medium', 'high'] // Ensure these values are lowercase
  },
  eventDate: {
    type: Date,
    required: true
  },
  volunteers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Volunteer' 
  }]
});

// Create a notification after an event is created
eventSchema.post('save', async function(doc, next) {
  try {
    const notification = new Notification({
      type: 'event',
      title: 'New Event Added',
      message: `A new event named "${doc.name}" has been added.`,
      event_id: doc._id,
      event_name: doc.name,
      assigned_date: new Date()
    });
    await notification.save();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Event', eventSchema);
