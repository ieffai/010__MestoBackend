const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        return next({ message: 'No any users was found' });
      }
      return res.send({ 'Users List': users });
    })
    .catch(() => next({ message: 'Can not get users' }));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next({ status: 404, message: 'Can not find user with such ID' });
      }
      return res.send({ message: `Good afternoon ${user.name}`, user });
    })
    .catch(() => next({ message: 'Wrong user ID, check it and try again' }));
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
    .catch(() => next({ message: 'Can not update avatar' }));
};

module.exports.delUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return next({ status: 404, message: 'Can not find user with such ID' });
      }
      return res.send({ message: `Bye ${user.name}, we'll be miss you` });
    })
    .catch(() => next({ message: 'Wrong user ID, check it and try again' }));
};
