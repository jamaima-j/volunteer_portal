import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileManagement = () => {
  const [userProfile, setUserProfile] = useState({
    email: '',
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    selectedSkills: '',
    preferences: '',
    availability: ''
  });

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  useEffect(() => {
    //fetch user profile details
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
        alert('Error updating profile');
      });
  };

  return (
    <div>
      <h2>Profile Management</h2>
      <form onSubmit={handleSubmission}>
        <input
          type="text"
          name="fullName"
          value={userProfile.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="address1"
          value={userProfile.address1}
          onChange={handleInputChange}
          placeholder="Address Line 1"
          required
        />
        <input
          type="text"
          name="address2"
          value={userProfile.address2}
          onChange={handleInputChange}
          placeholder="Address Line 2"
        />
        <input
          type="text"
          name="city"
          value={userProfile.city}
          onChange={handleInputChange}
          placeholder="City"
          required
        />
        <select
          name="state"
          value={userProfile.state}
          onChange={handleInputChange}
          required
        >
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <input
          type="text"
          name="zip"
          value={userProfile.zip}
          onChange={handleInputChange}
          placeholder="Zip Code"
          required
        />
        <input
          type="text"
          name="selectedSkills"
          value={userProfile.selectedSkills}
          onChange={handleInputChange}
          placeholder="Skills"
        />
        <input
          type="text"
          name="preferences"
          value={userProfile.preferences}
          onChange={handleInputChange}
          placeholder="Preferences"
        />
        <input
          type="text"
          name="availability"
          value={userProfile.availability}
          onChange={handleInputChange}
          placeholder="Availability"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileManagement;
