const { nanoid } = require("nanoid");
const db = require("../utils/db");

exports.create = async (req, res) => {
  const { name, description } = req.body;
  const id = await db("channels")
    .insert({ name, teamId: req.team.id, description, shortid: nanoid(14) })
    .returning("id")
    .then((row) => row[0]);
  const channel = await db("channels")
    .select(["id", "name", "shortid", "description"])
    .where({ id })
    .limit(1)
    .then((row) => row[0]);
  return res.status(200).send({ channel, team: req.team });
};

exports.read = async (req, res) => {
  return res.status(200).send({ channel: req.channel });
};

exports.delete = async (req, res) => {
  await req
    .db("channels")
    .where("id", req.channel.id)
    .del();
  return res.status(200).send({ id: req.channel.id });
};
