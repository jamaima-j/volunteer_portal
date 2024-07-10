import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const states = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },

  //hardcoded in for now, can change with database use
];

const skills = [
  'Placeholder Skill 1', 'Placeholder Skill 2', 'Placeholder Skill 3',
];

const days = [
  'Placeholder Date 1', 'Placeholder Date 2', 'Placeholder Date 3',
];

const Profile = ({ email }) => {
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [preferences, setPreferences] = useState('');
  const [availability, setAvailability] = useState([]);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!fullName || !address1 || !city || !state || !zip) {
      validationErrors.push('Please fill in all required fields.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Sending request to update profile with:', {
        email,
        fullName,
        address1,
        address2,
        city,
        state,
        zip,
        selectedSkills,
        preferences,
        availability
      });

      const response = await axios.put('http://localhost:5000/profile/update', {
        email,
        fullName,
        address1,
        address2,
        city,
        state,
        zip,
        selectedSkills,
        preferences,
        availability
      });

      setMessage('Profile updated successfully');
      console.log('Response from server:', response.data);
      navigate('/dashboard');
    } catch (err) {
      setMessage('Error updating profile');
      console.error('Error details:', err.response || err.message || err);
    }
  };

  const validateZip = (zip) => {
    const zipRegex = /^\d{5}$|^\d{9}$/;
    return zipRegex.test(zip);
  };

  const handleSkillsChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedSkills(selected);
  };

  const handleAvailabilityChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setAvailability(selected);
  };

  return (
    <div className="profile-page">
      <div className="form-container">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmission}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address 2 (optional)"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <select multiple={true} value={selectedSkills} onChange={handleSkillsChange}>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Preferences (optional)"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
          <select multiple={true} value={availability} onChange={handleAvailabilityChange}>
            {days.map((day, index) => (
              <option key={index} value={day}>
                {day}
              </option>
            ))}
          </select>
          <button type="submit">Save Profile</button>
        </form>
        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
