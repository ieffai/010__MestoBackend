const defaultErrorStatus = 500;

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || defaultErrorStatus;
  const message = err.message || 'Что-то пошло не так';
  console.log(req.method, req.path, 'Сработал обработчик ошибок');
  res.status(status).send(message);
};

module.exports = errorMiddleware;
