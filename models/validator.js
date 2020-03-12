const stringValidator = /([А-ЯЁ]|[A-Z][a-z]|[а-яё]+-?)+/;
const urlValidator = /http(s?):\/\/(www\.)?((\w|[a-яё]|-)+((\.(\w|[a-яё]|-)+){1,4})?\.(\w|[a-яё]|-)+)(:(\d{2,5}))?(\w|\/|\\)+#?/;

module.exports = {
  stringValidator,
  urlValidator,
};
