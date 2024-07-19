const request = require('supertest');
const express = require('express');
const eventsRoute = require('../routes/events');
const Event = require('../models/event');
const app = express();

app.use(express.json());
app.use('/events', eventsRoute);

jest.mock('../models/event');

describe('Events API', () => {
  it('should get all events', async () => {
    Event.find.mockResolvedValue([]);

    const response = await request(app).get('/events');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new event', async () => {
    const newEvent = {
      name: 'Test Event',
      description: 'Test Description',
      location: 'Test Location',
      requiredSkills: ['Skill 1'],
      urgency: 'High',
      date: '2024-07-20'
    };

    Event.prototype.save.mockResolvedValue(newEvent);

    const response = await request(app).post('/events').send(newEvent);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newEvent.name);
  });

  it('should update an event', async () => {
    const eventId = 'someEventId';
    const updatedEvent = {
      name: 'Updated Event',
      description: 'Updated Description',
      location: 'Updated Location',
      requiredSkills: ['Skill 2'],
      urgency: 'Medium',
      date: '2024-08-15'
    };

    Event.findByIdAndUpdate.mockResolvedValue(updatedEvent);

    const response = await request(app).put(`/events/${eventId}`).send(updatedEvent);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedEvent.name);
  });

  it('should delete an event', async () => {
    const eventId = 'someEventId';

    Event.findByIdAndDelete.mockResolvedValue({});

    const response = await request(app).delete(`/events/${eventId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Event deleted');
  });
});
