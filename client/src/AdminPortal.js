import React, { useState } from 'react';
import './AdminPortal.css';

const AdminPortal = () => {
  const [skills] = useState(['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']); // List of skills

  const openTab = (evt, tabName) => {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
  };

  const validateForm = (e) => {
    const volunteerName = document.getElementById('volunteerName').value;
    const volunteerSkills = document.getElementById('volunteerSkills').value;
    const volunteerAvailability = document.getElementById('volunteerAvailability').value;

    if (
      volunteerName.length > 100 ||
      volunteerSkills.length > 100 ||
      volunteerAvailability.length > 100
    ) {
      alert('Each field must be no more than 100 characters.');
      e.preventDefault();
      return false;
    }

    return true;
  };

  return (
    <div className="admin-portal">
      <div className="sidebar">
        <h2>Administrator</h2>
        <button className="tablink" onClick={(e) => openTab(e, 'Welcome')}>Welcome</button>
        <button className="tablink" onClick={(e) => openTab(e, 'EventManagement')}>Event Management Form</button>
        <button className="tablink" onClick={(e) => openTab(e, 'VolunteerMatching')}>Volunteer Matching Form</button>
        <button className="tablink" onClick={(e) => openTab(e, 'VolunteerHistory')}>Volunteer History</button>
        <button className="tablink" onClick={(e) => openTab(e, 'Notification')}>Notification</button>
      </div>

      <div className="main-content">
        <div id="Welcome" className="tabcontent">
          <div className="card welcome-card">
            <h3>Welcome Admin</h3>
          </div>
        </div>

        <div id="EventManagement" className="tabcontent">
          <div className="card">
            <h3>Event Management Form</h3>
            <form id="eventForm" onSubmit={(e) => e.preventDefault()}>
              <div className="form-section">
                <label htmlFor="eventName">Event Name (100 characters, required):</label>
                <input type="text" id="eventName" name="eventName" maxLength="100" required />
              </div>
              <div className="form-section">
                <label htmlFor="eventDescription">Event Description (required):</label>
                <textarea id="eventDescription" name="eventDescription" required></textarea>
              </div>
              <div className="form-section">
                <label htmlFor="location">Location (required):</label>
                <textarea id="location" name="location" required></textarea>
              </div>
              <div className="form-section">
                <label htmlFor="requiredSkills">Required Skills (required):</label>
                <select id="requiredSkills" name="requiredSkills" className="multi-select" multiple required>
                  {skills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              <div className="form-section">
                <label htmlFor="urgency">Urgency (required):</label>
                <select id="urgency" name="urgency" required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-section">
                <label htmlFor="eventDate">Event Date (required):</label>
                <input type="date" id="eventDate" name="eventDate" required />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>

        <div id="VolunteerMatching" className="tabcontent">
          <div className="card">
            <h3>Volunteer Matching Form</h3>
            <form onSubmit={validateForm}>
              <div className="form-section">
                <label htmlFor="volunteerName">Volunteer Name:</label>
                <input type="text" id="volunteerName" name="volunteerName" maxLength="100" required />
              </div>
              <div className="form-section">
                <label htmlFor="volunteerSkills">Volunteer Skills:</label>
                <input type="text" id="volunteerSkills" name="volunteerSkills" maxLength="100" required />
              </div>
              <div className="form-section">
                <label htmlFor="volunteerAvailability">Volunteer Availability:</label>
                <input type="text" id="volunteerAvailability" name="volunteerAvailability" maxLength="100" required />
              </div>
              <input type="submit" value="Submit" />
            </form>
            <div className="card">
              <h3>Volunteer has been matched to the following:</h3>
              {/* Matched volunteer activities will be displayed here */}
            </div>
          </div>
        </div>

        <div id="VolunteerHistory" className="tabcontent">
          <div className="card">
            <h3>Volunteer History</h3>
            <p>Here you can view the history of volunteer activities.</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Required Skills</th>
                  <th>Urgency</th>
                  <th>Event Date</th>
                  <th>Participation Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic rows will be populated here */}
                <tr>
                  <td>Community Clean-Up</td>
                  <td>Cleaning up the local park</td>
                  <td>Central Park</td>
                  <td>Cleaning, Teamwork</td>
                  <td>High</td>
                  <td>2024-07-15</td>
                  <td>Participated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="Notification" className="tabcontent">
          <div className="card">
            <h3>Notification System</h3>
            <div className="notification-section">
              <h4>New Event Assignments</h4>
              <ul className="notification-list">
                <li className="message-item">
                  <input type="checkbox" id="newAssignment1" />
                  <label htmlFor="newAssignment1">New Assignment: Park Clean-Up</label>
                </li>
              </ul>
            </div>
            <div className="notification-section">
              <h4>Updates</h4>
              <ul className="notification-list">
                <li className="message-item">
                  <input type="checkbox" id="update1" />
                  <label htmlFor="update1">Update: Event location changed to Community Center</label>
                </li>
              </ul>
            </div>
            <div className="notification-section">
              <h4>Reminders</h4>
              <ul className="notification-list">
                <li className="message-item">
                  <input type="checkbox" id="reminder1" />
                  <label htmlFor="reminder1">Reminder: Submit volunteer hours for June</label>
                </li>
              </ul>
            </div>
            <div id="popup" className="popup">
              <p>Reminder: You have pending tasks to complete!</p>
              <button className="close-btn" onClick={() => document.getElementById('popup').style.display = 'none'}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
