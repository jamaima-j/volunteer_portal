// login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//fake user database, hardcoded
let users = [
  { email: 'omarwabbouchi@gmail.com', password: bcrypt.hashSync('omaromar', 10), profileComplete: true, accountType: 'admin' },
  { email: 'jamaimajan@gmail.com', password: bcrypt.hashSync('jamaima1234', 10), profileComplete: true, accountType: 'admin' },
  { email: 'leannalkhateeb@gmail.com', password: bcrypt.hashSync('lilly1234', 10), profileComplete: true, accountType: 'admin' }, 
  { email: 'test@test.com', password: bcrypt.hashSync('testtest', 10), profileComplete: false, accountType: 'volunteer' }, 
  { email: 'test2@test.com', password: bcrypt.hashSync('testtest', 10), profileComplete: true, accountType: 'volunteer' }
];

//login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Received login request:', { email, password });

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid login. Please check your email and password.' });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  console.log('Password match:', passwordMatch);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid login. Please check your email and password.' });
  }

  return res.status(200).json({ message: 'Logged in successfully', user });
});

module.exports = router;
