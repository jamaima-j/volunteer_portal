const express = require('express');
const router = express.Router();

let users = [
  { email: 'omarwabbouchi@gmail.com', password: 'omaromar', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'jamaimajan@gmail.com', password: 'jamaima1234', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] },
  { email: 'leannalkhateeb@gmail.com', password: 'lilly1234', profileComplete: true, accountType: 'admin', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] }, 
  { email: 'test@test.com', password: 'testtest', profileComplete: false, accountType: 'volunteer', fullName: '', address1: '', address2: '', city: '', state: '', zip: '', selectedSkills: [], preferences: '', availability: [] }
];

//profile endpoint
router.put('/update', (req, res) => {
  const { email, fullName, address1, address2, city, state, zip, selectedSkills, preferences, availability } = req.body;
  let user = users.find(u => u.email === email);

//this mimics database adding functionality
  if (!user) {
    //creates new user instead of returning error as before
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
