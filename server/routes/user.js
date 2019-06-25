const express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('./../models/users');

router.post('/login', async function(req,res) {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({where: {username: username}})
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
      res.send('Incorrect password')
    } else {
      res.send('User logged in!!!!!!!!!!')
    }
  } catch(err) {
    console.log(err);
  }
});

router.post('/register', async function(req,res) {
  const { username, password, email } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({username: username, password: hash, email: email});
    res.send(user);
  } catch(e) {
    res.send(e);
  }

})

module.exports = router;