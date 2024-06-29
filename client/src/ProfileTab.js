import React from 'react';

const ProfileTab = () => {
  return (
    <div>
      <h2>Profile</h2>
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
            <td>01/01/2024</td>
            <td>Participated</td>
          </tr>
          <tr>
            <td>Event 2</td>
            <td>02/01/2024</td>
            <td>Missed</td>
          </tr>
          <tr>
            <td>Event 3</td>
            <td>03/01/2024</td>
            <td>Participated</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTab;
