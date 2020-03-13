const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(() => res.send({ message: `Your card ${name.toUpperCase()} succesfully created`, name, link }))
    .catch((err) => next({
      message: 'Can\'t create card',
      status: err.name === 'ValidationError' ? 400 : 500,
    }));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cardlist: cards }))
    .catch(() => next({ message: 'Can\'t get card list' }));
};

module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return next({ status: 404, message: 'Can not find card with such ID' });
      }
      return res.send({ data: card });
    })
    .catch((err) => next({
      message: 'Wrong card ID, check it and try again',
      status: err.name === 'CastError' ? 400 : 500,
    }));
};

module.exports.delCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card.owner.toString() !== '5e69f33795048a31748fc7da') {
        return next({ status: 403 });
      }
      return res.send({ message: `Card ${card.name.toUpperCase()} was succesfully deleted` });
    })
    .catch((err) => next({
      message: 'We can\'t delete your card',
      status: err.name === 'CastError' ? 400 : 500,
    }));
};

module.exports.like = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ data: card }))
    .catch(() => next({ message: 'Unable to like' }));
};

module.exports.dislike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ data: card }))
    .catch(() => next({ message: 'Unable to dislike' }));
};
