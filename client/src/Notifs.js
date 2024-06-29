import React from 'react';

const notifications = [
  { datetime: '2024-06-25T14:30:00', message: 'Reminder: [Event Name] starting now at [Event Location]' },
  { datetime: '2024-06-25T13:00:00', message: 'Reminder: [Event Name] begins in 1 hour at [Event Location]' },
  { datetime: '2024-06-24T14:30:00', message: 'Reminder: [Event Name] tomorrow at [Event Time] at [Event Location]' },
];

const sortNotificationsByDateTime = (notifications) => {
  return notifications.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
};

const Notifs = () => {
  const sortedNotifications = sortNotificationsByDateTime(notifications);

  return (
    <div>
      <h2>Notifications</h2>
      {sortedNotifications.map((notification, index) => (
        <div key={index} className="notification">
          <h3>{new Date(notification.datetime).toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</h3>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifs;
