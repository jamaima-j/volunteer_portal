const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../models/notification');
const notificationRoute = require('../routes/notifications'); // Ensure correct path

const createAppWithNotifications = () => {
  const app = express();
  app.use(express.json());
  app.use('/notifications', notificationRoute); // Ensure correct usage
  return app;
};

describe('Notifications API', () => {
  let app;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/volunteer', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app = createAppWithNotifications();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get all notifications', async () => {
    const response = await request(app).get('/notifications');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add a new notification', async () => {
    const newNotification = {
      type: 'update',
      title: 'New Event Update',
      message: 'The event has been updated.'
    };
    const response = await request(app).post('/notifications').send(newNotification);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newNotification.title);
  });

  it('should delete a notification', async () => {
    const notification = new Notification({
      type: 'update',
      title: 'Delete Test',
      message: 'This is a delete test.'
    });
    await notification.save();
    const response = await request(app).delete(`/notifications/${notification._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Notification deleted');
  });
});
