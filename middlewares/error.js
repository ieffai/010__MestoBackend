const defaultErrorStatus = 500;

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || defaultErrorStatus;
  const message = err.message || 'Something went wrong';
  // eslint-disable-next-line no-console
  console.log(req.method, req.path, 'ERORR MIDDLEWARE WORKING');
  res.status(status).send(message);
};

module.exports = errorMiddleware;
