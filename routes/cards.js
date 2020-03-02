const express = require('express');

const cards = require('../data/cards.json');

const router = express.Router();


//  Get all users
router.get('/', (req, res) => res.json(cards));
module.exports = router;
