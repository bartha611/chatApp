const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization || null;
  const token = authToken && authToken.split(" ")[1];
  return jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(403).send("User not authorized");
    req.user = decoded.user;
    return next();
  });
};

module.exports = authenticate;
