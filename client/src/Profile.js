import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const states = [
  { code: 'TX', name: 'Texas' },
  //add other states
];

const skills = [
  'Placeholder Skill 1', 'Placeholder Skill 2', 'Placeholder Skill 3', //temporary
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    //validate required fields
    if (!fullName || !address1 || !city || !state || !zip || selectedSkills.length === 0 || availability.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }

    //simulate saving profile data for the time being
    console.log('Profile saved successfully');
    navigate('/dashboard');
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
    <div>
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
        placeholder="Address 2"
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
        placeholder="Preferences"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
      />
      <select multiple={true} value={availability} onChange={handleAvailabilityChange}>
        {/*add date options for availability */} 
      </select>
      <button onClick={handleSubmit}>Save Profile</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Profile;
