const owner = (req, res, next) => {
  req.user = {
    _id: '5e69f33795048a31748fc7da',
  };
  next();
};

module.exports = owner;
