const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const client = await pool.connect();
  try {
    const response = await client.query(
      `SELECT * FROM Users WHERE username = $1`,
      [username]
    );
    if (!response.rows[0]) {
      return res.status(400).send("No user exists");
    }
    const user = response.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Username or Password is incorrect");
    }
    req.session.userId = user.id;
    req.session.user = user.username;
    return res.status(200).send(user.username);
  } catch (e) {
    return res.status(400).send("Error connecting to database");
  } finally {
    client.release();
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(404).send(err);
    }
    return res.status(200).send("success");
  });
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const client = await pool.connect();
  try {
    const response = await client.query(
      "SELECT * FROM USERS WHERE username = $1",
      [username]
    );
    if (response.rows[0]) {
      return res.status(404).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      `INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3) RETURNING username`,
      [username, email, hashedPassword]
    );
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    return res.status(404).send("Error in creation");
  } finally {
    client.release();
  }
};
