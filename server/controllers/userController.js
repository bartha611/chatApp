const { User } = require("./../models/users");
const bcrypt = require("bcrypt");

exports.login = async function(req, res) {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).send("User doesn't exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.send("Incorrect password");
    } else {
      res.send("User logged in!!!!!!!!!!");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.register = async function(req, res) {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      return res.status(404).send("User already exists");
    }
    password = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: password,
      email: email
    });
    res.status(200).send(user);
  } catch (err) {
    return res.status(404).send("Error in creation");
  }
};

