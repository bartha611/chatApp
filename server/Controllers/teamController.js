const shortid = require("shortid");
const db = require("../utils/db");

exports.create = async (req, res) => {
  const { id: administrator } = req.user;
  const { name } = req.body;
  try {
    return db.transaction(async (trx) => {
      try {
        const team = await trx("teams")
          .insert({
            name,
            administrator,
            shortid: shortid.generate(),
          })
          .returning("*")
          .then((row) => row[0]);
        await trx("userteams").insert({
          teamId: team.id,
          userId: administrator,
        });
        const channel = await trx("channels")
          .insert({
            name: "random",
            teamId: team.id,
            description: "random channel",
            shortid: shortid.generate(),
          })
          .returning("*")
          .then((row) => row[0]);
        await trx("messages")
          .insert({
            message: "Joined random",
            channelId: channel.id,
            userId: administrator,
          })
          .returning("*")
          .then((row) => row[0]);
        return res.status(200).send({ team });
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.list = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const teams = await db("userteams AS ut")
      .select("t.id", "t.name", "t.shortid")
      .join("teams AS t", "ut.teamId", "=", "t.id")
      .where("ut.userId", userId);
    return res.status(200).send({ teams });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  const { teamId } = req.query;
  if (req.user.id !== req.team.administrator) {
    return res.status(403).send("Forbidden");
  }
  try {
    await db("teams")
      .where({ teamId })
      .del();
    return res.status(200).send({ id: teamId });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.get = async (req, res) => {
  try {
    const members = await db("userteams AS ut")
      .select("u.id", "u.username", "u.email", "u.avatar")
      .join("users AS u", "u.id", "=", "ut.userId")
      .where("ut.teamId", req.team.id);
    const channels = await db("channels AS c")
      .select("c.id", "c.name", "c.shortid", "c.description")
      .where("c.teamId", req.team.id);
    return res.status(200).send({ team: req.team, members, channels });
  } catch (err) {
    return res.status(500).send(err);
  }
};
