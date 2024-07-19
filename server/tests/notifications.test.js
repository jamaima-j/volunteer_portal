const request = require('supertest');
const express = require('express');
const notificationRoute = require('../routes/notifications');

// Function to create a new instance of the app with isolated notifications array
const createAppWithNotifications = (initialNotifications) => {
  const app = express();
  const notifications = [...initialNotifications];
  app.use(express.json());
  app.use('/notifications', notificationRoute(notifications));
  return { app, notifications };
};

describe('Notifications API', () => {
  let app, notifications;

  beforeEach(() => {
    const initialNotifications = [
      { datetime: '2024-06-25T14:30:00', message: 'Reminder: [Event Name] starting now at [Event Location]' },
      { datetime: '2024-06-25T13:30:00', message: 'Reminder: [Event Name] begins in 1 hour at [Event Location]' },
      { datetime: '2024-06-24T14:30:00', message: 'Reminder: [Event Name] tomorrow at [Event Time] at [Event Location]' },
    ];
    ({ app, notifications } = createAppWithNotifications(initialNotifications));
  });

  it('should get all notifications', async () => {
    const response = await request(app).get('/notifications');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(notifications.length);
  });

  it('should add a new notification', async () => {
    const newNotification = {
      datetime: '2024-07-07T10:00:00',
      message: 'New event notification'
    };
    const response = await request(app).post('/notifications').send(newNotification);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newNotification);
  });

  it('should delete a notification', async () => {
    const response = await request(app).delete('/notifications/0');
    expect(response.statusCode).toBe(200);
    expect(notifications.length).toBe(2);
    expect(notifications[0].message).toBe('Reminder: [Event Name] begins in 1 hour at [Event Location]');
  });
});
