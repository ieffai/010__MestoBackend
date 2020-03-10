const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (link) => /http(s?):\/\/(www\.)?((\w|[a-яё]|-)+((\.(\w|[a-яё]|-)+){1,4})?\.(\w|[a-яё]|-)+)(:(\d{2,5}))?(\w|\/|\\)+#?/.test(link),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, 'URL required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
