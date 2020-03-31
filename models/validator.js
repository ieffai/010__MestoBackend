const stringValidator = /([А-ЯЁ]|[A-Z][a-z]|[а-яё]+-?)+/;
const urlValidator = /http(s?):\/\/(www\.)?((\w|[a-яё]|-)+((\.(\w|[a-яё]|-)+){1,4})?\.(\w|[a-яё]|-)+)(:(\d{2,5}))?(\w|\/|\\)+#?/;
const emailValidator = /(\w+-?)+@(\w+-?)+\.\w+/;
const passValidator = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;

module.exports = {
  stringValidator,
  urlValidator,
  emailValidator,
  passValidator,
};
