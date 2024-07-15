const request = require('supertest');
const express = require('express');
const registrationRoute = require('../routes/registration');

const app = express();
app.use(express.json());
app.use('/auth', registrationRoute);

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
  });

  it('should return error for missing email', async () => {
    const response = await request(app).post('/auth/register').send({
      password: 'newpassword',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is required');
  });

  it('should return error for missing password', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'newuser@test.com',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password is required');
  });

  it('should return error for missing account type', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'newuser@test.com',
      password: 'newpassword'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Account type is required');
  });

  it('should return error for invalid email format', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'invalid-email',
      password: 'newpassword',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email format');
  });

  it('should return error for password less than 6 characters', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'newuser@test.com',
      password: 'short',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Password must be at least 6 characters long');
  });

  it('should return error for existing user', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'test@test.com',
      password: 'testtest',
      accountType: 'volunteer'
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User already exists. Please login.');
  });
});
