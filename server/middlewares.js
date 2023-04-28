module.exports = {
  log: function (req, res, next) {
    console.log(req.path, req.method);
    next();
  },
};
