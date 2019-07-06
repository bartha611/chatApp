const { User } = require("./../models/users");
const bcrypt = require('bcrypt');

exports.login = async function(req,res) {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ where: { username: username } });
    if(!user) {
      return res.send("User doesn't exist")
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.send("Incorrect password");
    } else {
      res.send("User logged in!!!!!!!!!!");
    }
  } catch (err) {
      console.log("hello")
      console.log(err);
  }
}