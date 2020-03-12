const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.signUp = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then( (user) => {
      console.log(user);
      res.status(201).send( { _id: req.user._id, email: req.body.email });
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}
