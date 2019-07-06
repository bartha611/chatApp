const express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("./../models/users");
const userController = require('./../controllers/userController');

router.post("/login", userController.login);

router.post("/register", async function(req, res) {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.send("Username already taken");
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hash,
      email: email
    });
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
