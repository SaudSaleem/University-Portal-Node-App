// Custom built in middleware functions
function log(req, res, next) {
  console.log("custom middleware fuction called");
  next();
}
module.exports = log;
