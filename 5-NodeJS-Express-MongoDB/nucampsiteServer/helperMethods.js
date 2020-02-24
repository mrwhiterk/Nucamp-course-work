function reject(req, res, next) {
  const err = new Error("You are not authenticated");
  res.setHeader("WWW-Authenticate", "Basic");
  err.status = 401;
  return next(err);
}

module.exports = { reject };
