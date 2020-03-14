const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(() => res.send({ message: `Your card ${name.toUpperCase()} succesfully created`, name, link }))
    .catch((err) => next({
      message: err.message,
      status: err.name === 'ValidationError' ? 400 : 500,
    }));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cardlist: cards }))
    .catch(() => next({}));
};


module.exports.delCard = (req, res, next) => {
  Card.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
    .then((card) => {
      if (!card) {
        return next({ status: 403 });
      }
      return res.send({ message: `Card ${card.name.toUpperCase()} was succesfully deleted` });
    })
    .catch((err) => next({
      message: err.message,
      status: err.name === 'CastError' ? 403 : 500,
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
