const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const db = require("../utils/db");

const s3 = new aws.S3({});

dotenv.config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db("users AS u")
      .select("*")
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
    delete user.password;
    const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: "24h",
    });
    return res.status(200).send({ user, token, teams });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db("users")
      .insert({ username, email, password: hashedPassword })
      .returning(["username", "email", "id", "avatar"])
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
      .select("id", "username", "email", "avatar")
      .where("username", search)
      .orWhere("email", search)
      .first();
    return res.status(200).send({ user: response });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.photo = async (req, res) => {
  try {
    const userAvatar = await db("users")
      .select("avatar")
      .where("id", req.user.id)
      .first();
    if (
      userAvatar !== "https://flack611.s3.amazonaws.com/images/nightsky.jpg"
    ) {
      await s3
        .deleteObject({
          Bucket: "flack611",
          Key: `${decodeURIComponent(
            userAvatar.avatar
              .split("/")
              .slice(3, 5)
              .join("/")
          )}`,
        })
        .promise();
    }
    const user = await db("users")
      .where({ id: req.user.id })
      .update({ avatar: req.file.location })
      .returning(["id", "username", "fullName", "avatar"])
      .then((row) => row[0]);
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(500).send(err);
  }
};
