const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ "Your card": card }))
    .catch(() => { return next({ message: `Can't creat your card` }) });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ 'Card List': cards }))
    .catch(() => { return next({ message: `Can't get card list`}) });
};

module.exports.delCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ message: `Your card ${card.name.toUpperCase()} was succesfully deleted` }))
    .catch(() => { return next({ message: `We can't delete your card` }) });
};

module.exports.like = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ card }))
    .catch(() => { return next({ message: 'Unable to like' }) });
};

module.exports.dislike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ card }))
    .catch(() => { return next({ message: 'Unable to dislike' }) });
};
