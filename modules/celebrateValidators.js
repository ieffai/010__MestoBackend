const { celebrate, Joi } = require('celebrate');
const { stringValidator, urlValidator, passValidator } = require('../models/validator');

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().pattern(new RegExp(stringValidator)).required().min(2)
      .max(30),
    about: Joi.string().pattern(new RegExp(stringValidator)).required().min(2)
      .max(30),
    avatar: Joi.string().pattern(new RegExp(urlValidator)).required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .pattern(new RegExp(passValidator))
      .required()
      .min(6)
      .error(new Error('Password must contain at least 6 characters, one uppercase letter, one special character and one number')),
  }),
});

const updateProfileValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().required().min(2)
      .max(30),
    about: Joi.string().pattern(new RegExp(stringValidator)).required().min(2)
      .max(30),
  }),
});

const changeAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(urlValidator)).required(),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().required().min(2)
      .max(30),
    link: Joi.string().pattern(new RegExp(urlValidator)).required(),
  }),
});

const idValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  signIn, signUp, updateProfileValid, changeAvatarValid, createCardValid, idValid,
};
