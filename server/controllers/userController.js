const bcrypt = require("bcrypt");
const dotenv = require('dotenv');

dotenv.config();
const { Pool } = require('pg');
// const { Team } = require("../models/team");
// const { userTeam } = require("../models/userTeam");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    client.query('SELECT * FROM Users where username = $1',[username], async (error, results) => {
      if (error) {
        return res.status(400).send("Error connecting to database")
      }
      client.release();
      if (!results.rows[0]) {
        return res.status(400).send("No user exists");
      }
      const user = results.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).send("Username or password is incorrect");
      }
      return res.status(200).send(results.rows[0].username);
  })
} catch(e) {
  res.status(400).send("Error connecting to database");
}
};

exports.logout = function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(404).send(err);
    }
    return res.status(200).send("success");
  });
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const client = await pool.connect();
    const response = await client.query("SELECT * FROM USERS WHERE username = $1", [username]);
    console.log(response.rows[0]);
    if (response.rows[0]) {
      return res.status(404).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query("INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3)", 
    [username, email, hashedPassword])
    client.release()
    return res.status(200).send(result);
  } catch (err) {
    return res.status(404).send("Error in creation");
  } 
};
