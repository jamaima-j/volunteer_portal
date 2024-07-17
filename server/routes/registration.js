const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//hardcoded "database"
let users = [
  { email: 'omarwabbouchi@gmail.com', password: bcrypt.hashSync('omaromar', 10), profileComplete: true, accountType: 'admin' },
  { email: 'jamaimajan@gmail.com', password: bcrypt.hashSync('jamaima1234', 10), profileComplete: true, accountType: 'admin' },
  { email: 'leannalkhateeb@gmail.com', password: bcrypt.hashSync('lilly1234', 10), profileComplete: true, accountType: 'admin' }, 
  { email: 'test@test.com', password: bcrypt.hashSync('testtest', 10), profileComplete: false, accountType: 'volunteer' }, 
  { email: 'test2@test.com', password: bcrypt.hashSync('testtest', 10), profileComplete: true, accountType: 'volunteer' }
  
];

//registration endpoint
router.post('/register', (req, res) => {
  const { email, password, accountType } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (!accountType) {
    return res.status(400).json({ message: 'Account type is required' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists. Please login.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { email, password: hashedPassword, profileComplete: false, accountType };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully', user: newUser });
});

module.exports = router;
