const logger = require('./logger');
const errorMiddleware = require('./error');
const owner = require('./owner');

module.exports = {
  logger,
  errorMiddleware,
  owner,
};
