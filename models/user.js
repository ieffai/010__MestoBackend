const mongoose = require('mongoose');
const { stringValidator, urlValidator } = require('./validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => {
        return stringValidator.test(v);
      }
    },
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => {
        return stringValidator.test(v);
      }
    },
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => {
        return urlValidator.test(v);
      }
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
