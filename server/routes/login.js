const express = require('express');
const router = express.Router();
const User = require('../models/User');
//const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (email === 'admin@admin.com' && password === '12345678') { 
    return res.status(200).json({
      message: 'Admin login successful',
      user: {
        email: 'admin@admin.com',
        accountType: 'admin',
        profileComplete: true,
      },
    });
  }

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the plain text password
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

/* router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user); //check for user

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); //check for password match

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;*/


