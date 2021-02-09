const { nanoid } = require("nanoid");
const db = require("../utils/db");

exports.create = async (req, res) => {
  const { id: administrator, email } = req.user;
  const { name } = req.body;
  try {
    return db.transaction(async (trx) => {
      try {
        const team = await trx("teams")
          .insert({
            name,
            administrator,
            shortid: nanoid(14),
          })
          .returning("*")
          .then((row) => row[0]);
        const profile = await trx("profiles")
          .insert({
            teamId: team.id,
            userId: administrator,
            fullName: email.split("@")[0],
            shortid: nanoid(14),
          })
          .returning("*")
          .then((row) => row[0]);
        const channel = await trx("channels")
          .insert({
            name: "random",
            teamId: team.id,
            description: "random channel",
            shortid: nanoid(14),
          })
          .returning("*")
          .then((row) => row[0]);
        await trx("messages")
          .insert({
            message: "Joined random",
            channelId: channel.id,
            profileId: profile.id,
          })
          .returning("*")
          .then((row) => row[0]);
        return res.status(200).send({ team });
      } catch (err) {
        return res.status(500).send(err);
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.list = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const teams = await db("profiles AS p")
      .select("t.id", "t.name", "t.shortid")
      .join("teams AS t", "p.teamId", "=", "t.id")
      .where("p.userId", userId);
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
    const members = await db("profiles AS P")
      .select("p.id", "p.fullName", "p.avatar", "p.displayName")
      .where("p.teamId", req.team.id);
    const channels = await db("channels AS c")
      .select("c.id", "c.name", "c.shortid", "c.description")
      .where("c.teamId", req.team.id);
    return res.status(200).send({ team: req.team, members, channels });
  } catch (err) {
    return res.status(500).send(err);
  }
};
