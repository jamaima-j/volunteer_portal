const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const eventRoute = require('../routes/events');
const Event = require('../models/event');

const app = express();
app.use(express.json());
app.use('/events', eventRoute);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/volunteer', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Event.deleteMany({});
});

describe('Events API', () => {
  it('should get all events', async () => {
    await Event.create({ name: 'Test Event', description: 'Event Description', location: 'Test Location', requiredSkills: ['Skill 1'], urgency: 'Low', eventDate: new Date() });
    const response = await request(app).get('/events');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
  }, 20000);

  it('should create a new event', async () => {
    const event = { name: 'Test Event', description: 'Event Description', location: 'Test Location', requiredSkills: ['Skill 1'], urgency: 'Low', eventDate: new Date() };
    const response = await request(app).post('/events').send(event);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Event');
  }, 20000);

  it('should update an event', async () => {
    const event = await Event.create({ name: 'Test Event', description: 'Event Description', location: 'Test Location', requiredSkills: ['Skill 1'], urgency: 'Low', eventDate: new Date() });
    const updatedEvent = { name: 'Updated Event', description: 'Updated Description', location: 'Updated Location' };
    const response = await request(app).put(`/events/${event._id}`).send(updatedEvent);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Event');
  }, 20000);

  it('should delete an event', async () => {
    const event = await Event.create({ name: 'Test Event', description: 'Event Description', location: 'Test Location', requiredSkills: ['Skill 1'], urgency: 'Low', eventDate: new Date() });
    const response = await request(app).delete(`/events/${event._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event deleted');
  }, 20000);
});
