const express = require('express');
const router = express.Router();
const cards = require('../data/cards.json');

//Get all users
router.get ('/', (req, res) => res.json(cards));

module.exports = router;