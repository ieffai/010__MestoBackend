const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

//Get all users
router.get ('/', (req, res) => res.json(users));

//Get user
router.get('/:_id', (req, res) => {
  const found = users.some(user => user._id === req.params._id);
  if (found) {
    res.json(users.filter(user => user._id === req.params._id));
  } else {
    res.status(404).json({ msg: `Нет пользователя с таким id`});
  };
});

module.exports = router;