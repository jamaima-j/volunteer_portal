const request = require('supertest');
const express = require('express');
const createVolunteerHistoryRoute = require('../routes/volunteerHistory');
const app = express();

const volunteers = [
  { id: 1, name: "John Doe", skills: ["Skill 1", "Skill 2"], availability: "Weekends", matchedEvents: [1] },
  { id: 2, name: "Jane Smith", skills: ["Skill 3", "Skill 4"], availability: "Weekdays", matchedEvents: [2] }
];

const events = [
  { id: 1, name: "Community Clean-Up", description: "Cleaning up the park", location: "Central Park", requiredSkills: ["Skill 1"], urgency: "High", date: "2024-07-20", volunteers: [1] },
  { id: 2, name: "Food Drive", description: "Collecting and distributing food", location: "Community Center", requiredSkills: ["Skill 2"], urgency: "Medium", date: "2024-08-15", volunteers: [2] }
];

app.use(express.json());
app.use('/volunteerHistory', createVolunteerHistoryRoute(volunteers, events));

describe('Volunteer History API', () => {
  it('should get volunteer history', async () => {
    const response = await request(app).get('/volunteerHistory');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
