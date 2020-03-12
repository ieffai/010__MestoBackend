const mongoose = require('mongoose');

const { stringValidator, urlValidator } = require('./validator');

const cardSchema = new mongoose.Schema({
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
  link: {
    type: String,
    validate: {
      validator: (v) => {
        return urlValidator.test(v);
      }
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
