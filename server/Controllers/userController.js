const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");

dotenv.config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db("users AS u")
      .select("u.id", "u.username", "u.email", "u.password")
      .where({ username })
      .first();
    if (!user) {
      return res.status(404).send("User or password isn't correct");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).send("User or password isn't correct");
    }
    const teams = await db("userteams AS ut")
      .select("t.id", "t.shortid", "t.name")
      .join("teams AS t", "t.id", "=", "ut.teamId")
      .where("ut.userId", user.id);
    const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: "24h",
    });
    delete user.password;
    return res.status(200).send({ user, token, teams });
  } catch (err) {
    return res.status(404).send("Error in retrieving data");
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db("users")
      .insert({ username, email, password: hashedPassword })
      .returning(["username", "email", "id"])
      .then((row) => row[0]);
    const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: "24h",
    });
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send("Error");
  }
};

exports.list = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  try {
    const response = await db("users AS u")
      .select("id", "username", "email")
      .where("username", search)
      .orWhere("email", search)
      .first();
    return res.status(200).send({ user: response });
  } catch (err) {
    return res.status(500).send(err);
  }
};
