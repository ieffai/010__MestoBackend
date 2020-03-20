const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const { stringValidator, urlValidator } = require('./validator');

const cardSchema = new mongoose.Schema({
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
  link: {
    type: String,
    validate: {
      validator: (v) => urlValidator.test(v),
      message: 'Неправильный формат ввода',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
