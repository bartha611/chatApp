const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization || null;
  const token = authToken && authToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.username = decoded.username;
    return next();
  });
};

module.exports = authenticate;
