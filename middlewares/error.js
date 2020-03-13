const defaultErrorStatus = 500;
const defaultErrorMessage = 'Something went wrong';

const errorMessages = {
  400: 'Bad request, check input and try again',
  403: 'Sorry, you don\'t have permission for this action',
  404: 'No such file or directory',
};

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || defaultErrorStatus;
  const message = err.message || errorMessages[status] || defaultErrorMessage;
  // eslint-disable-next-line no-console
  console.log(req.method, req.path, 'ERROR MIDDLEWARE WORKING');
  res.status(status).send(message);
};

module.exports = errorMiddleware;
