const bcrypt = require("bcrypt");
const { User } = require("./../models/users");

exports.login = async function login(req, res) {
  const { username, password } = req.body;
  try {
    const possibleUser = await User.findOne({ where: { username } });
    if (!possibleUser) {
      return res.status(404).send("User doesn't exist");
    }
    const match = await bcrypt.compare(password, possibleUser.password);
    if (!match) {
      return res.status(404).send('incorrect password');
    } 
      req.session.user = username;
      return res.status(200).send('success');
    
  } catch (err) {
    return res.status(404).send(err);
  }
};

exports.logout = function logout(req,res) {
  console.log("hello")
  req.session.destroy(err => {
    if(err) {
      return res.status(404).send(err);
    }
    return res.status(200).send('success');
  })
}

exports.register = async function register(req, res) {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      return res.status(404).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      hashedPassword,
      email
    });
    return res.status(200).send(newUser);
  } catch (err) {
    return res.status(404).send("Error in creation");
  }
};

