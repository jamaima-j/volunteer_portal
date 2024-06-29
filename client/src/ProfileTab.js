import React from 'react';
import './ProfileTab.css';

const ProfileTab = () => {
  return (
    <div className="profile-tab">
      <h2>Volunteer History</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Event 1</td>
            <td>06/28/2024</td>
            <td>Participated</td>
          </tr>
          <tr>
            <td>Event 2</td>
            <td>06/21/2024</td>
            <td>Participated</td>
          </tr>
          <tr>
            <td>Event 3</td>
            <td>06/14/2024</td>
            <td>Missed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTab;
