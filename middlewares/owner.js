const owner = (req, res, next) => {
  req.user = {
    _id: '5e5d65168458b41b448465e9',
  };
  next();
};

module.exports = owner;
