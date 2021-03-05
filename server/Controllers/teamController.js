const { nanoid } = require("nanoid");
const db = require("../utils/db");

exports.create = async (req, res) => {
  const { id: administrator, email } = req.user;
  const { name } = req.body;
  return db
    .transaction(async (trx) => {
      const id = await trx("teams")
        .insert({
          name,
          administrator,
          shortid: nanoid(14),
        })
        .returning("id")
        .then((row) => row[0]);
      const team = await trx("teams")
        .select("*")
        .where("id", id)
        .then((row) => row[0]);
      const profile = await trx("profiles")
        .insert({
          teamId: team.id,
          userId: administrator,
          fullName: email.split("@")[0],
          confirmed: true,
          shortid: nanoid(14),
        })
        .returning("id")
        .then((row) => row[0]);
      const channel = await trx("channels")
        .insert({
          name: "random",
          teamId: team.id,
          description: "random channel",
          shortid: nanoid(14),
        })
        .returning("id")
        .then((row) => row[0]);
      await trx("messages").insert({
        message: "Joined random",
        channelId: channel,
        profileId: profile,
      });
      return res.status(200).send({ team });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
};

exports.list = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const teams = await db("profiles AS p")
      .select("t.id", "t.name", "t.shortid")
      .join("teams AS t", "p.teamId", "=", "t.id")
      .where("p.userId", userId)
      .andWhere("p.confirmed", true);
    return res.status(200).send({ teams });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  const { teamId } = req.params;
  if (req.user.id !== req.team.administrator) {
    console.log(`user not admin`);
    return res.status(403).send("Forbidden");
  }
  try {
    await db("teams")
      .where("shortid", teamId)
      .del();
    return res.status(200).send({ id: teamId });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.get = async (req, res) => {
  try {
    const members = await db("profiles AS p")
      .select("p.id", "p.fullName", "p.avatar", "p.displayName")
      .where("p.teamId", req.team.id)
      .andWhere("p.confirmed", true);
    const channels = await db("channels AS c")
      .select("c.id", "c.name", "c.shortid", "c.description")
      .where("c.teamId", req.team.id);
    return res
      .status(200)
      .send({ team: req.team, members, channels, profile: req.profile });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
