const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => /http(s?):\/\/(www\.)?((\w|[a-яё]|-)+((\.(\w|[a-яё]|-)+){1,4})?\.(\w|[a-яё]|-)+)(:(\d{2,5}))?(\w|\/|\\)+#?/.test(link),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
