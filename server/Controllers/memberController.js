const db = require("../utils/db");

exports.create = async (req, res) => {
  const { id: userId } = req.member;
  const { id: teamId } = req.team;
  try {
    await db("userteams").insert({ userId, teamId });
    return res.status(200).send({ member: req.member });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.read = async (req, res) => {};
