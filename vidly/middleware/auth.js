const jwt = require("jsonwebtoken");
const config = require('config');

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No Token Provided");

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedPayload;
    next();
  } catch (exception) {
    res.status(400).send("Invalid Token");
  }

};

module.exports = auth;