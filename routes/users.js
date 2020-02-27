const express = require('express');

const users = require('../data/users.json');

const router = express.Router();
// Get all users
router.get('/', (req, res) => res.json(users));

// Get user
router.get('/:_id', (req, res) => {
  const user = users.find((item) => item._id === req.params._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ msg: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
