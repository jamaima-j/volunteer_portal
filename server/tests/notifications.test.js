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
    await mongoose.connect('mongodb://127.0.0.1:27017/volunteer', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app = createAppWithNotifications();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Notification.deleteMany({}); // Clear the collection before each test
  });

  it('should get all notifications', async () => {
    // Create a sample notification to retrieve
    await Notification.create({ type: 'update', title: 'Test Notification', message: 'Test message' });

    const response = await request(app).get('/notifications');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Test Notification');
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
    expect(response.body.message).toBe(newNotification.message);

    // Verify it was added to the database
    const savedNotification = await Notification.findById(response.body._id);
    expect(savedNotification).not.toBeNull();
    expect(savedNotification.title).toBe(newNotification.title);
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

    // Verify it was removed from the database
    const deletedNotification = await Notification.findById(notification._id);
    expect(deletedNotification).toBeNull();
  });
});
