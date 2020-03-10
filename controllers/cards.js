const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  // .populate('user')
    .then((card) => res.send({ data: card }))
    // .then(res.send({ message: 'Карточка успешно добавлена' }))
    .catch(() => next({ message: 'Не удалось создать карточку' }));
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    // .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(() => next({ message: 'Не удалось получить карточки' }));
};

module.exports.delCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => next({ message: 'Не удалось удалить карточку' }));
};

module.exports.like = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ data: card }))
    .catch(() => next({ message: 'Невозможно поставить лайк карточке' }));
};

module.exports.dislike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => res.send({ data: card }))
    .catch(() => next({ message: 'Себя дизлайкай, дизлайкер мля...' }));
};
