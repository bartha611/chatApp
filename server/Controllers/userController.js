const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");
const sendMail = require("../utils/sendMail");

dotenv.config();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db("users AS u")
      .select("*")
      .where({ email })
      .first();
    if (!user || !user.confirmed) {
      return res.status(404).send("User not confirmed or doesn't exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).send("User or password isn't correct");
    }
    const teams = await db("profiles AS p")
      .select("t.id", "t.shortid", "t.name")
      .join("teams AS t", "t.id", "=", "ut.teamId")
      .where("p.userId", user.id);
    delete user.password;
    const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: "24h",
    });
    return res.status(200).send({ user, token, teams });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db("users")
      .insert({ username, email, password: hashedPassword })
      .returning(["email", "id"])
      .then((row) => row[0]);
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET_TOKEN);
    const confirmation = `${req.protocol}://${req.get(
      "host"
    )}/api/user/confirmation/${token}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      html: `Click here to confirm email <a href=${confirmation}>${confirmation}</a>`,
    };
    await sendMail(mailOptions);
    return res.status(200).send("User has been sent a confirmation email");
  } catch (err) {
    return res.status(500).send("Error");
  }
};

exports.list = async (req, res) => {
  const { search } = req.query;
  try {
    const response = await db("users AS U")
      .select("email")
      .where("email", search)
      .first();
    return res.status(200).send({ user: response });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.confirmation = async (req, res) => {
  const { token } = req.params;
  try {
    const { id } = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    await db("users AS u")
      .update({ confirmed: true })
      .where({ id });
    return res.status(200).send("You have successfully registered");
  } catch (err) {
    return res.status(500).send(err);
  }
};
