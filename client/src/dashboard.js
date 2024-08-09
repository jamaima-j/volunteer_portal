// Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';
import UpcomingEvents from './Upcoming_Events';
import ProfileTab from './ProfileTab';
import Notifications from './Notifs';
import ProfileManagement from './ProfileManagement';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <Notifications />;
      case 'events':
        return <UpcomingEvents />;
      case 'profile':
        return <ProfileTab />;
      case 'profileManagement':
        return <ProfileManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        <nav className="navbar">
          <ul>
            <li
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </li>
            <li
              className={activeTab === 'profileManagement' ? 'active' : ''}
              onClick={() => setActiveTab('profileManagement')}
            >
              Profile Management
            </li>
          </ul>
        </nav>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
