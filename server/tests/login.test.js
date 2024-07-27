const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const loginRoute = require('../routes/login');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/auth', loginRoute);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/volunteer', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await User.create({ email: 'test@test.com', password: await bcrypt.hash('testtest', 10), accountType: 'volunteer' });
});

describe('Login', () => {
  it('should login successfully with correct credentials', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'testtest'
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  }, 20000);

  it('should return error for incorrect credentials', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'wrongpassword'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid login. Please check your email and password.');
  }, 20000);

  it('should return error for missing email', async () => {
    const response = await request(app).post('/auth/login').send({
      password: 'testtest'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid login. Please check your email and password.');
  }, 20000);

  it('should return error for missing password', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid login. Please check your email and password.');
  }, 20000);

  it('should return error for invalid email format', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'invalid-email',
      password: 'testtest'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid login. Please check your email and password.');
  }, 20000);
});
