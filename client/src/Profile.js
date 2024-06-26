import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Profile = () => {
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
  const navigate = useNavigate();

  const handleSubmission = () => {
    const validationErrors = [];

    if (!fullName || !address1 || !city || !state || !zip) {
      validationErrors.push('Please fill in all required fields.');
    }

    if (fullName.length > 50) {
      validationErrors.push('Full name must be 50 characters or less.');
    }

    if (address1.length > 100) {
      validationErrors.push('Address may not be longer than 100 characters.');
    }

    if (city.length > 100) {
      validationErrors.push('City name may not be longer than 100 characters.');
    }

    if (!validateZip(zip)) {
      validationErrors.push('Zip code must be either 5 or 9 characters long and contain only numbers.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors([]);
      console.log('Profile saved successfully');
      navigate('/dashboard');
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
        <button onClick={handleSubmission}>Save Profile</button>
        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;