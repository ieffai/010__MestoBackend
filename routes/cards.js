const router = require('express').Router();

const {
  createCard, getCards, delCard, like, dislike,
} = require('../controllers/cards');

const { createCardValid, idValid } = require('../modules/celebrateValidators');

router.get('/', getCards);
router.delete('/:id', idValid, delCard);
router.post('/', createCardValid, createCard);
router.put('/:id/likes', like);
router.delete('/:id/likes', dislike);

module.exports = router;
