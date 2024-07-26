const express = require('express');
const router = express.Router();
const State = require('../models/State');

//gets all states
router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

module.exports = router;