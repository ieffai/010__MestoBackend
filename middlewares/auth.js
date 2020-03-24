const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Ты зашел не в тот район, голубок' });
};

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return handleAuthError(res);
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'neponimauchtotutdoljnobyt');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
