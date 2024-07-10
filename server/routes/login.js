const express = require('express');
const router = express.Router();

//fake user database, hardcoded
let users = [
  { email: 'omarwabbouchi@gmail.com', password: 'omaromar', profileComplete: true, accountType: 'admin' },
  { email: 'jamaimajan@gmail.com', password: 'jamaima1234', profileComplete: true, accountType: 'admin' },
  { email: 'leannalkhateeb@gmail.com', password: 'lilly1234', profileComplete: true, accountType: 'admin' }, 
  { email: 'test@test.com', password: 'testtest', profileComplete: false, accountType: 'volunteer' }, 
  { email: 'test2@test.com', password: 'testtest', profileComplete: true, accountType: 'volunteer' }
];

//login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) { //checks fake database
    return res.status(401).json({ message: 'Invalid login. Please check your email and password.' });
  }

  return res.json({
    message: 'Logged in successfully',
    accountType: user.accountType,
    profileComplete: user.profileComplete
  });
});

module.exports = router;
