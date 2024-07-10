const express = require('express');
const router = express.Router();

let users = [
  { email: 'omarwabbouchi@gmail.com', password: 'omaromar', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'jamaimajan@gmail.com', password: 'jamaima1234', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'leannalkhateeb@gmail.com', password: 'lilly1234', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] }, 
  { email: 'test@test.com', password: 'testtest', profileComplete: false, accountType: 'volunteer', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] }
];

// Update profile endpoint
router.put('/update', (req, res) => {
  const { email, fullName, address1, address2, city, state, zip, selectedSkills, preferences, availability } = req.body;
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  users[userIndex] = {
    ...users[userIndex],
    fullName,
    address1,
    address2,
    city,
    state,
    zip,
    selectedSkills,
    preferences,
    availability,
    profileComplete: true
  };

  return res.json({ message: 'Profile updated successfully', user: users[userIndex] });
});

module.exports = router;
