const mongoose = require('mongoose');
const { stringValidator, urlValidator } = require('./validator');

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   minlength: 2,
  //   maxlength: 30,
  //   validate: {
  //     validator: (v) => stringValidator.test(v),
  //   },
  //   required: true,
  // },
  // about: {
  //   type: String,
  //   minlength: 2,
  //   maxlength: 30,
  //   validate: {
  //     validator: (v) => stringValidator.test(v),
  //   },
  //   required: true,
  // },
  // avatar: {
  //   type: String,
  //   validate: {
  //     validator: (v) => urlValidator.test(v),
  //   },
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model('user', userSchema);
