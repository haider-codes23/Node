// middleware function for logging every request
function logger(req, res, next) {
  console.log("logging");
  next();
};

module.exports = logger;