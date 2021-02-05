const db = require("../utils/db");

exports.create = async (req, res) => {
  const { message } = req.body;
  const { id: channelId } = req.channel;
  const { id: userId } = req.user;
  try {
    const response = await db("messages")
      .insert({
        message,
        channelId,
        userId,
      })
      .returning(["id", "message", "created_at"])
      .then((row) => row[0]);
    response.user = req.user;
    response.user.role = req.role;
    return res.status(200).send({ message: response });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.read = async (req, res) => {
  try {
    const messages = await db("messages AS m")
      .select(
        "m.id",
        "m.message",
        "m.created_at",
        "u.username",
        "u.avatar",
        "u.fullName",
        "ut.role"
      )
      .join("users AS u", "u.id", "=", "m.userId")
      .join("userteams AS ut", "ut.userId", "=", "u.id")
      .where({ channelId: req.channel.id, teamId: req.channel.teamId })
      .orderBy("m.id");
    return res.status(200).send({ messages, channel: req.channel });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await req.db("messages").update({ message }, ["*"]);
    return res.status(200).send({ message: response });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  const { messageId: id } = req.query;
  try {
    await req
      .db("messages")
      .where({ id })
      .del();
    return res.status(200).send({ id });
  } catch (err) {
    return res.status(500).send(err);
  }
};
