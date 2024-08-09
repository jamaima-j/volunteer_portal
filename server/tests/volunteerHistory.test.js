const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const createVolunteerHistoryRoute = require('../routes/volunteerHistory');
const User = require('../models/User'); // Assuming you have this model set up correctly
const Event = require('../models/event'); // Assuming you have this model set up correctly

const app = express();

// Use JSON middleware
app.use(express.json());

// Connect to a test database (in-memory database for testing purposes)
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/volunteerHistoryTestDb`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Drop the database before each test to ensure a clean slate
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  // Set up test data with lowercase urgency values
  const event1 = new Event({
    name: "Community Clean-Up",
    description: "Cleaning up the park",
    location: "Central Park",
    requiredSkills: ["Skill 1"],
    urgency: "high", // Lowercase value
    eventDate: new Date("2024-07-20"),
  });

  const event2 = new Event({
    name: "Food Drive",
    description: "Collecting and distributing food",
    location: "Community Center",
    requiredSkills: ["Skill 2"],
    urgency: "medium", // Lowercase value
    eventDate: new Date("2024-08-15"),
  });

  await event1.save();
  await event2.save();

  const volunteer1 = new User({
    fullName: "John Doe",
    accountType: "volunteer",
    matchedEvents: [event1._id],
  });

  const volunteer2 = new User({
    fullName: "Jane Smith",
    accountType: "volunteer",
    matchedEvents: [event2._id],
  });

  await volunteer1.save();
  await volunteer2.save();
});

// Use the volunteerHistory route
app.use('/volunteerHistory', createVolunteerHistoryRoute);

describe('Volunteer History API', () => {
  it('should get volunteer history', async () => {
    const response = await request(app).get('/volunteerHistory');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('volunteerName');
    expect(response.body[0]).toHaveProperty('eventName');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('location');
    expect(response.body[0]).toHaveProperty('requiredSkills');
    expect(response.body[0]).toHaveProperty('urgency');
    expect(response.body[0]).toHaveProperty('date');
    expect(response.body[0]).toHaveProperty('participationStatus');
  });
});

// Disconnect from the database after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});
