const router = require('express').Router();

const {
  createCard, getCards, getCard, delCard, like, dislike,
} = require('../controllers/cards');

router.get('/', getCards);
router.get('/:id', getCard);
router.delete('/:id', delCard);
router.post('/', createCard);
router.put('/:id/likes', like);
router.delete('/:id/likes', dislike);

module.exports = router;
