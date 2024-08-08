import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPortal.css';

const AdminPortal = () => {
  const [skills] = useState([
    'Ability to listen actively and convey information clearly.',
    'Proficiency in written and verbal communication.',
    'Empathy and the ability to work well with others.',
    'Building relationships and networking.',
    'Time management',
    'Attention to detail and the ability to follow through on commitments.',
    'Ability to think critically and creatively to resolve issues.',
    'Flexibility and adaptability in changing situations.'
  ]);
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    fetchVolunteers();
    fetchEvents();
    fetchVolunteerHistory();
    fetchNotifications();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/matching/volunteers');
      setVolunteers(response.data);
      console.log('Volunteers:', response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/matching/events');
      setEvents(response.data);
      console.log('Events:', response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchVolunteerHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/volunteerHistory');
      setVolunteerHistory(response.data);
    } catch (error) {
      console.error('Error fetching volunteer history:', error);
    }
  };
 
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notifications');
      setNotifications(response.data);
      console.log('Notifications:', response.data); 
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      name: e.target.eventName.value,
      description: e.target.eventDescription.value,
      location: e.target.location.value,
      skills: Array.from(e.target.requiredSkills.selectedOptions, option => option.value),
      urgency: e.target.urgency.value,
      eventDate: e.target.eventDate.value,
    };

    try {
      const response = await axios.post('http://localhost:5000/admin/events', newEvent); 
      setEvents([...events, response.data]);
      setNotifications([...notifications, { message: `Event "${newEvent.name}" added successfully`, type: 'success' }]);
      e.target.reset();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected Volunteer ID:', selectedVolunteer); 
    console.log('Selected Event ID:', selectedEvent); 
    try {
      await axios.post('http://localhost:5000/matching/match', {
        volunteerId: selectedVolunteer,
        eventId: selectedEvent,
      });
      setNotifications([...notifications, { message: `Volunteer matched to event successfully`, type: 'success' }]);
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
            <form onSubmit={handleMatchSubmit}>
              <div className="form-section">
                <label htmlFor="volunteerSelect">Volunteer Name:</label>
                <select id="volunteerSelect" onChange={(e) => setSelectedVolunteer(e.target.value)} required>
                  <option value="">Select Volunteer</option>
                  {volunteers.map((volunteer) => (
                    <option key={volunteer._id} value={volunteer._id}>{volunteer.fullName}</option>
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

        <div id="VolunteerHistory" className="tabcontent">
          <div className="card">
            <h3>Volunteer History</h3>
            <p>Here you can view the history of volunteer activities.</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Volunteer Name</th>
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
                {volunteerHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.volunteerName}</td>
                    <td>{entry.eventName}</td>
                    <td>{entry.description}</td>
                    <td>{entry.location}</td>
                    <td>{Array.isArray(entry.requiredSkills) ? entry.requiredSkills.join(', ') : entry.requiredSkills}</td>
                    <td>{entry.urgency}</td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    <td>{entry.participationStatus}</td>
                  </tr>
                ))}
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
                {notifications.map((notification, index) => (
                  <li key={index} className="message-item">
                    <input type="checkbox" id={`newAssignment${index}`} />
                    <label htmlFor={`newAssignment${index}`}>{notification.message}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="notification-section">
              <h4>Updates</h4>
              <ul className="notification-list">
                {notifications.map((notification, index) => (
                  <li key={index} className="message-item">
                    <input type="checkbox" id={`update${index}`} />
                    <label htmlFor={`update${index}`}>{notification.message}</label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="notification-section">
              <h4>Reminders</h4>
              <ul className="notification-list">
                {notifications.map((notification, index) => (
                  <li key={index} className="message-item">
                    <input type="checkbox" id={`reminder${index}`} />
                    <label htmlFor={`reminder${index}`}>{notification.message}</label>
                  </li>
                ))}
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

