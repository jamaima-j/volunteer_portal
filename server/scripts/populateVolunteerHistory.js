const mongoose = require('mongoose');
const Volunteer = require('../models/Volunteer');
const Event = require('../models/event');

mongoose.connect('mongodb://localhost:27017/volunteer', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Volunteer.deleteMany({});
    await Event.deleteMany({});

    const event1 = new Event({
      name: 'Community Clean-Up',
      description: 'Cleaning up the park',
      location: 'Central Park',
      requiredSkills: ['Skill 1'],
      urgency: 'High',
      eventDate: new Date('2024-07-20'),
    });

    const event2 = new Event({
      name: 'Food Drive',
      description: 'Collecting and distributing food',
      location: 'Community Center',
      requiredSkills: ['Skill 2'],
      urgency: 'Medium',
      eventDate: new Date('2024-08-15'),
    });

    const volunteer1 = new Volunteer({
      name: 'John Doe',
      email: 'john@example.com',
      skills: ['Skill 1', 'Skill 2'],
      availability: 'Weekends',
      matchedEvents: [event1._id]
    });

    const volunteer2 = new Volunteer({
      name: 'Jane Smith',
      email: 'jane@example.com',
      skills: ['Skill 3', 'Skill 4'],
      availability: 'Weekdays',
      matchedEvents: [event2._id]
    });

    event1.volunteers.push(volunteer1._id);
    event2.volunteers.push(volunteer2._id);

    await event1.save();
    await event2.save();
    await volunteer1.save();
    await volunteer2.save();

    console.log('Sample data inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
