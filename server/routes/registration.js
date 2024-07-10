const express = require('express');
const router = express.Router();

//hardcoded "database"
let users = [
  { email: 'omarwabbouchi@gmail.com', password: 'omaromar', profileComplete: true, accountType: 'admin' },
  { email: 'jamaimajan@gmail.com', password: 'jamaima1234', profileComplete: true, accountType: 'admin' },
  { email: 'leannalkhateeb@gmail.com', password: 'lilly1234', profileComplete: true, accountType: 'admin'}, 
  { email: 'test@test.com', password: 'testtest', profileComplete: false, accountType: 'volunteer'}, 
  { email: 'test2@test.com', password: 'testtest', profileComplete: true, accountType: 'volunteer'}
];

//registration endpoint
router.post('/register', (req, res) => {
  const { email, password, accountType } = req.body;
  const userExists = users.some(u => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists. Please login.' });
  }

  users.push({ email, password, accountType, profileComplete: false });
  return res.json({ message: 'Registered successfully' });
});

module.exports = router;
