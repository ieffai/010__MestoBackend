const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next({ message: 'Невозможно получить пользователей' }));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next({ status: 404, message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch(() => next({}));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => next({ message: 'Не удалось создать пользователя' }));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(res.send({ message: 'User succesfully updated' }))
    .catch(() => next({ message: 'Профиль не обновлен' }));
};

module.exports.changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(res.send({ message: 'Avatar succesfully updated' }))
    .catch(() => next({ message: 'Изменение аватара не удалось' }));
};

module.exports.delUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(res.send({ message: 'User succesfully deleted' }))
    .catch(() => next({ message: 'Себя удали, утырок, а тут ты никого удалять не будешь' }));
};
