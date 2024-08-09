import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifs.css';

const Notifs = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const sortedNotifications = notifications.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  return (
    <div className="notifs-container">
      <h2>Notifications</h2>
      {sortedNotifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification.datetime && !isNaN(new Date(notification.datetime)) && (
            <h3>{new Date(notification.datetime).toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</h3>
          )}
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifs;
