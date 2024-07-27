const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  event_name: String,
  assigned_date: Date,
  update_details: String,
  update_date: Date,
  reminder_date: Date
});

module.exports = mongoose.model('Notification', notificationSchema);
