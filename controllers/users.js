const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create(
      {
        name,
        about,
        avatar,
        email,
        password: hash,
      },
    ))
    .then((user) => res.send({
      message: `Welcome ${user.name}, we had lack of ${user.about + 's'.toLowerCase()} here!`, data: name, about, avatar, email,
    }))
    .catch((err) => next({
      message: err.message,
      status: err.code === 11000 ? 409 : 500,
    }));
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

const { JWT_SECRET } = require('../config');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: `Hi ${user.name}` });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
