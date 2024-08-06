const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const volunteers = await User.find({ accountType: 'volunteer' });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
