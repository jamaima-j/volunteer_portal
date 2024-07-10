const express = require('express');

module.exports = (notifications) => {
  const router = express.Router();

  // Get all notifications
  router.get('/', (req, res) => {
    res.json(notifications);
  });

  // Add a new notification
  router.post('/', (req, res) => {
    const newNotification = req.body;
    notifications.push(newNotification);
    res.status(201).json(newNotification);
  });

  // Delete a notification
  router.delete('/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < notifications.length) {
      const removedNotification = notifications.splice(index, 1);
      res.json(removedNotification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  });

  return router;
};
