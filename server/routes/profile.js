const express = require('express');
const router = express.Router();
const User = require('../models/User');

//profile update endpoint
router.put('/update', async (req, res) => {
  try {
    const { email, fullName, address, city, state, zip, skills, preferences, availability } = req.body;

    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //update user profile
    user.fullName = fullName;
    user.address = address;
    user.city = city;
    user.state = state;
    user.zip = zip;
    user.skills = skills;
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
