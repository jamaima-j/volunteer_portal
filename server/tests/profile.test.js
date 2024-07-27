const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const profileRoute = require('../routes/profile');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/profile', profileRoute);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/volunteer', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await User.create({
    email: 'test@test.com',
    password: await bcrypt.hash('testtest', 10),
    accountType: 'volunteer',
    fullName: 'Test User',
    address1: '123 Main St',
    city: 'Anytown',
    state: 'NY',
    zip: '12345',
    selectedSkills: ['Skill 1'],
    preferences: 'None',
    availability: ['Weekends'],
    profileComplete: false
  });
});

describe('Profile Update', () => {
  it('should update profile successfully', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile updated successfully');
    expect(response.body.user.email).toBe('test@test.com');
  }, 20000);

  it('should return error for missing full name', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Full name is required and must be less than 50 characters.');
  }, 20000);

  it('should return error for missing address1', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Address 1 is required and must be less than 100 characters.');
  }, 20000);

  it('should return error for missing city', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St',
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('City is required and must be less than 100 characters.');
  }, 20000);

  it('should return error for missing state', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('State is required.');
  }, 20000);

  it('should return error for missing zip', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Zip code is required and must be either 5 or 9 digits long.');
  }, 20000);

  it('should return error for invalid zip format', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '1234',  //invalid zip
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Zip code is required and must be either 5 or 9 digits long.');
  }, 20000);

  it('should return error for full name longer than 50 characters', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe'.repeat(10), //exceeds 50 characters
      address1: '123 Main St',
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Full name is required and must be less than 50 characters.');
  }, 20000);

  it('should return error for address1 longer than 100 characters', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St'.repeat(20), //exceeds 100 characters
      city: 'Anytown',
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Address 1 is required and must be less than 100 characters.');
  }, 20000);

  it('should return error for city longer than 100 characters', async () => {
    const response = await request(app).put('/profile/update').send({
      email: 'test@test.com',
      fullName: 'John Doe',
      address1: '123 Main St',
      city: 'Anytown'.repeat(20), //exceeds 100 characters
      state: 'NY',
      zip: '12345',
      selectedSkills: ['Skill 1'],
      preferences: 'None',
      availability: ['Weekends']
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('City is required and must be less than 100 characters.');
  }, 20000);
});
