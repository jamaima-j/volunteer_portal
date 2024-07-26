import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileManagement = () => {
  const [states, setStates] = useState([]);
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    skills: '',
    preferences: '',
    availability: ''
  });

  useEffect(() => {
    // Fetch states from backend
    axios.get('http://localhost:5000/states')
      .then(response => {
        setStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });

    // Fetch user profile details
    const email = localStorage.getItem('email');
    if (email) {
      axios.get(`http://localhost:5000/profile/${email}`)
        .then(response => {
          setUserProfile(response.data);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5000/profile/update', userProfile)
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      <h2>Profile Management</h2>
      <form onSubmit={handleSubmission}>
        <input type="text" name="fullName" value={userProfile.fullName} onChange={handleInputChange} placeholder="Full Name" required />
        <input type="text" name="address" value={userProfile.address} onChange={handleInputChange} placeholder="Address" required />
        <input type="text" name="city" value={userProfile.city} onChange={handleInputChange} placeholder="City" required />
        <select name="state" value={userProfile.state} onChange={handleInputChange} required>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state._id} value={state.name}>{state.name}</option>
          ))}
        </select>
        <input type="text" name="zip" value={userProfile.zip} onChange={handleInputChange} placeholder="Zip" required />
        <input type="text" name="skills" value={userProfile.skills} onChange={handleInputChange} placeholder="Skills" />
        <input type="text" name="preferences" value={userProfile.preferences} onChange={handleInputChange} placeholder="Preferences" />
        <input type="text" name="availability" value={userProfile.availability} onChange={handleInputChange} placeholder="Availability" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileManagement;