const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const registrationRoute = require('../routes/registration');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/auth', registrationRoute);

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/volunteer', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Registration', () => {
  it('should register successfully with valid data', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'newuser@test.com',
      password: 'newpassword',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user.email).toBe('newuser@test.com');
  }, 20000);

  it('should return error for existing user', async () => {
    await User.create({ email: 'test@test.com', password: 'testtest', accountType: 'volunteer' });

    const response = await request(app).post('/auth/register').send({
      email: 'test@test.com',
      password: 'testtest',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists. Please login.');
  }, 20000);

  it('should return error for missing email', async () => {
    const response = await request(app).post('/auth/register').send({
      password: 'testtest',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is required');
  }, 20000);

  it('should return error for missing password', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'test@test.com',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password is required');
  }, 20000);

  it('should return error for missing account type', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'test@test.com',
      password: 'testtest'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Account type is required');
  }, 20000);

  it('should return error for invalid email format', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'invalid-email',
      password: 'testtest',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email format');
  }, 20000);

  it('should return error for short password', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'test@test.com',
      password: 'short',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password must be at least 8 characters long.');
  }, 20000);
});
