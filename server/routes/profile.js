const express = require('express');
const router = express.Router();

let users = [
  { email: 'omarwabbouchi@gmail.com', password: 'omaromar', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'jamaimajan@gmail.com', password: 'jamaima1234', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'leannalkhateeb@gmail.com', password: 'lilly1234', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] }, 
  { email: 'test@test.com', password: 'testtest', profileComplete: false, accountType: 'volunteer', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'test2@test.com', password: 'testtest', profileComplete: true, accountType: 'volunteer', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] }
];

// Get profile by email
router.get('/:email', (req, res) => {
  const user = users.find(u => u.email === req.params.email);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  return res.json({ user });
});

//profile endpoint
router.put('/update', (req, res) => {
  const { email, fullName, address1, address2, city, state, zip, selectedSkills, preferences, availability } = req.body;

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
  if (!zip || !/^\d{5}$|^\d{9}$/.test(zip)) {
    return res.status(400).json({ message: 'Zip code is required and must be either 5 or 9 digits long.' });
  }

  let user = users.find(u => u.email === email);

  //this mimics database adding functionality
  if (!user) {
    //creates new user if user not found instead of returning error as before
    user = { email, password: '', profileComplete: false, accountType: 'volunteer' };
    users.push(user); //adds user to fake db
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

  return res.json({ message: 'Profile updated successfully', user });
});

module.exports = router;
