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
      res.status(404).send('incorrect password');
    } else {
      req.session.user = username;
      res.status(200).send(user);
    }
  } catch (err) {
    return res.status(404).send(err);
  }
};

exports.logout = function(req,res) {
  req.session.destroy(err => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/')
  })
}

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

