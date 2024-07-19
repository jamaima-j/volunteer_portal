const request = require('supertest');
const express = require('express');
const createMatchingRoute = require('../routes/matching');
const app = express();

const volunteers = [
  { id: 1, name: "John Doe", skills: ["Skill 1", "Skill 2"], availability: "Weekends", matchedEvents: [] },
  { id: 2, name: "Jane Smith", skills: ["Skill 3", "Skill 4"], availability: "Weekdays", matchedEvents: [] }
];

const events = [
  { id: 1, name: "Community Clean-Up", description: "Cleaning up the park", location: "Central Park", requiredSkills: ["Skill 1"], urgency: "High", date: "2024-07-20", volunteers: [] },
  { id: 2, name: "Food Drive", description: "Collecting and distributing food", location: "Community Center", requiredSkills: ["Skill 2"], urgency: "Medium", date: "2024-08-15", volunteers: [] }
];

app.use(express.json());
app.use('/matching', createMatchingRoute(volunteers, events));

describe('Matching API', () => {
  it('should get all volunteers', async () => {
    const response = await request(app).get('/matching/volunteers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(volunteers.length);
  });

  it('should get all events', async () => {
    const response = await request(app).get('/matching/events');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(events.length);
  });

  it('should add a new volunteer', async () => {
    const newVolunteer = {
      name: "New Volunteer",
      skills: ["Skill 5"],
      availability: "Anytime"
    };

    const response = await request(app).post('/matching/volunteers').send(newVolunteer);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newVolunteer.name);
  });

  it('should add a new event', async () => {
    const newEvent = {
      name: "New Event",
      description: "Event Description",
      location: "Event Location",
      requiredSkills: ["Skill 3"],
      urgency: "Low",
      date: "2024-09-01"
    };

    const response = await request(app).post('/matching/events').send(newEvent);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newEvent.name);
  });

  it('should match a volunteer to an event', async () => {
    const matchData = { volunteerId: 1, eventId: 1 };

    const response = await request(app).post('/matching/match').send(matchData);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Volunteer matched to event successfully');
  });
});
