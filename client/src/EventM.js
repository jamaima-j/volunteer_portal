import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Function to inject CSS styles dynamically
function injectStyle(css) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}

// CSS styles
const css = `
body {
    font-family: Arial, sans-serif;
}

.tabs {
    overflow: hidden;
    background-color: #2e3a56;
    color: white;
    height: 100vh;
    width: 250px;
    position: fixed;
}

.tabs button {
    display: block;
    background-color: #555;
    color: white;
    width: 100%;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    transition: 0.3s;
    text-align: left;
}

.tabs button:hover, .tabs button.active {
    background-color: #777;
}

.tabcontent {
    margin-left: 250px;
    padding: 20px;
    border-top: none;
    height: 100vh;
    overflow: auto;
}

.tabcontent h3 {
    margin-top: 0;
}

.card {
    background-color: #252a41;
    border: 1px solid #444c6b;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h3 {
    font-size: 22px;
    margin-bottom: 20px;
}

.card label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.card input[type="text"],
.card textarea,
.card select,
.card input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #444c6b;
    border-radius: 5px;
    background-color: #1b1e2f;
    color: white;
    box-sizing: border-box;
}

.card input[type="submit"] {
    background-color: #555;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.card input[type="submit"]:hover {
    background-color: #777;
}

/* Style for multi-select dropdown */
.multi-select {
    width: 100%;
}

.multi-select option {
    padding: 10px;
}
`;

// Inject the CSS styles
injectStyle(css);

const EventM = () => {
  const [skills] = useState(['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']);
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [activeTab, setActiveTab] = useState('Welcome');

  useEffect(() => {
    fetchEvents();
    fetchVolunteers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/volunteers');
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      name: e.target.eventName.value,
      description: e.target.eventDescription.value,
      location: e.target.location.value,
      skills: Array.from(e.target.requiredSkills.selectedOptions, option => option.value),
      urgency: e.target.urgency.value.toLowerCase(), // Transform urgency to lowercase
      eventDate: e.target.eventDate.value,
    };

    try {
      const response = await axios.post('http://localhost:5000/admin/events', newEvent);
      if (response.status === 201) {
        setEvents([...events, response.data]); // Update state to include new event
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/matching/match', {
        volunteerId: selectedVolunteer,
        eventId: selectedEvent,
      });
      alert('Volunteer matched successfully');
    } catch (error) {
      console.error('Error matching volunteer:', error);
    }
  };

  const downloadPDFReport = () => {
    axios.get('http://localhost:5000/admin/reporting/report/pdf', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'volunteer_report.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('There was an error generating the PDF report!', error);
      });
  };

  const downloadCSVReport = () => {
    axios.get('http://localhost:5000/admin/reporting/report/csv', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'volunteer_report.csv');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('There was an error generating the CSV report!', error);
      });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="event-management">
      <div className="tabs">
        <button className={`tablink ${activeTab === 'Welcome' ? 'active' : ''}`} onClick={() => handleTabClick('Welcome')}>Welcome</button>
        <button className={`tablink ${activeTab === 'EventManagement' ? 'active' : ''}`} onClick={() => handleTabClick('EventManagement')}>Event Management Form</button>
        <button className={`tablink ${activeTab === 'VolunteerMatching' ? 'active' : ''}`} onClick={() => handleTabClick('VolunteerMatching')}>Volunteer Matching Form</button>
        <button className={`tablink ${activeTab === 'VolunteerHistory' ? 'active' : ''}`} onClick={() => handleTabClick('VolunteerHistory')}>Volunteer History</button>
        <button className={`tablink ${activeTab === 'Notification' ? 'active' : ''}`} onClick={() => handleTabClick('Notification')}>Notification</button>
      </div>

      <div className="main-content">
        {activeTab === 'Welcome' && (
          <div id="Welcome" className="tabcontent">
            <div className="card welcome-card">
              <h3>Welcome Admin</h3>
            </div>
          </div>
        )}

        {activeTab === 'EventManagement' && (
          <div id="EventManagement" className="tabcontent">
            <div className="card">
              <h3>Event Management Form</h3>
              <form id="eventForm" onSubmit={handleFormSubmit}>
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
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
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
        )}

        {activeTab === 'VolunteerMatching' && (
          <div id="VolunteerMatching" className="tabcontent">
            <div className="card">
              <h3>Volunteer Matching Form</h3>
              <form onSubmit={handleMatchSubmit}>
                <div className="form-section">
                  <label htmlFor="volunteerSelect">Volunteer Name:</label>
                  <select id="volunteerSelect" onChange={(e) => setSelectedVolunteer(e.target.value)} required>
                    <option value="">Select Volunteer</option>
                    {volunteers.map((volunteer) => (
                      <option key={volunteer._id} value={volunteer._id}>{volunteer.email}</option>
                    ))}
                  </select>
                </div>
                <div className="form-section">
                  <label htmlFor="eventSelect">Matched Event:</label>
                  <select id="eventSelect" onChange={(e) => setSelectedEvent(e.target.value)} required>
                    <option value="">Select Event</option>
                    {events.map((event) => (
                      <option key={event._id} value={event._id}>{event.name}</option>
                    ))}
                  </select>
                </div>
                <input type="submit" value="Match" />
              </form>
            </div>
          </div>
        )}

        {activeTab === 'VolunteerHistory' && (
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
                  {events.map(event => (
                    <tr key={event._id}>
                      <td>{event.name}</td>
                      <td>{event.description}</td>
                      <td>{event.location}</td>
                      <td>{event.skills.join(', ')}</td>
                      <td>{event.urgency}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>Participated</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Notification' && (
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
        )}
      </div>
    </div>
  );
};

export default EventM;
