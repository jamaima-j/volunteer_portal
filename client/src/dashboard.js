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
      case 'profile-management':
        return <ProfileManagement />;
      case 'events':
        return <UpcomingEvents />;
      case 'profile':
        return <ProfileTab />;
      case 'notifications':
        return <Notifications />;
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
              className={activeTab === 'profile-management' ? 'active' : ''}
              onClick={() => setActiveTab('profile-management')}
            >
              Profile Management
            </li>
            <li
              className={activeTab === 'events' ? 'active' : ''}
              onClick={() => setActiveTab('events')}
            >
              Upcoming Events
            </li>
            <li
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </li>
            <li
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </li>
          </ul>
        </nav>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
