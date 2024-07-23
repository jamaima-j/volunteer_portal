const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:email', async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
});

router.put('/update', async (req, res) => {
  const { email, fullName, address1, address2, city, state, zip, selectedSkills, preferences, availability } = req.body;

  const user = await User.findOne({ email });
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

  res.json({ message: 'Profile updated successfully', user });
});

module.exports = router;
