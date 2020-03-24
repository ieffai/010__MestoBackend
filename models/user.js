const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { stringValidator, urlValidator } = require('./validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => stringValidator.test(v),
      message: 'Неправильный формат ввода',
    },
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => stringValidator.test(v),
      message: 'Неправильный формат ввода',
    },
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => urlValidator.test(v),
      message: 'Неправильный формат сайта',
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
    select: false,
    validate: {
      validator: () => Promise.resolve(false),
      message: 'Pass validation failed'
    }
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
