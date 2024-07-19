const request = require('supertest');
const express = require('express');
const loginRoute = require('../routes/login');

const app = express();
app.use(express.json());
app.use('/auth', loginRoute);

describe('Login', () => {
  it('should login successfully with correct credentials', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'testtest'
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged in successfully');
    expect(response.body.user.email).toBe('test@test.com');
  });

  it('should return error for incorrect credentials', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'wrongpassword'
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid login. Please check your email and password.');
  });

  it('should return error for missing email', async () => {
    const response = await request(app).post('/auth/login').send({
      password: 'testtest'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is required');
  });

  it('should return error for missing password', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password is required');
  });

  it('should return error for invalid email format', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'invalid-email',
      password: 'testtest'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email format');
  });
});
