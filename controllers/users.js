const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next({ message: err.message }));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next({ status: 404, message: 'Can not find user with such ID' });
      }
      return res.send({ message: `Good afternoon ${user.name}`, user });
    })
    .catch((err) => next({
      message: err.message,
      status: err.name === 'CastError' ? 400 : 500,
    }));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ message: `Welcome ${user.name}, we had lack of ${user.about + 's'.toLowerCase()} here!`, data: user }))
    .catch(() => next({ message: 'Can not create user' }));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true })
    .then(() => res.send({ name, about, message: 'Profile succesfully updated' }))
    .catch(() => next({ message: 'Can not update user profile' }));
};

module.exports.changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { new: true, runValidators: true })
    .then((user) => res.send({ user, message: 'Avatar succesfully changed' }))
    .catch((err) => next({
      message: 'Can not update avatar',
      status: err.name === 'CastError' ? 400 : 500,
    }));
};
