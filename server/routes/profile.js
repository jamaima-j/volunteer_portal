const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Profile update endpoint
router.put('/update', async (req, res) => {
  const {
    email, fullName, address1, address2, city, state, zip,
    selectedSkills, preferences, availability
  } = req.body;

  console.log('Received request to update profile with email:', email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  if (!fullName || fullName.length > 50) {
    return res.status(400).json({ message: 'Full name is required and must be less than 50 characters.' });
  }

  if (!address1 || address1.length > 100) {
    return res.status(400).json({ message: 'Address 1 is required and must be less than 100 characters.' });
  }

  if (!city || city.length > 100) {
    return res.status(400).json({ message: 'City is required and must be less than 100 characters.' });
  }

  if (!state) {
    return res.status(400).json({ message: 'State is required.' });
  }

  if (!zip || !/^\d{5}(-\d{4})?$/.test(zip)) {
    return res.status(400).json({ message: 'Zip code is required and must be either 5 or 9 digits long.' });
  }

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fullName = fullName;
    user.address1 = address1;
    user.address2 = address2;
    user.city = city;
    user.state = state;
    user.zip = zip;
    user.selectedSkills = selectedSkills;
    user.preferences = preferences;
    user.availability = availability;
    user.profileComplete = true;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;
