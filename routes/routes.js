const usersRouter = require('./users');
const cardsRouter = require('./cards');
const errorRouter = require('./error');
const signUpRouter = require('./signup');

module.exports = {
  usersRouter,
  cardsRouter,
  errorRouter,
  signUpRouter
};
