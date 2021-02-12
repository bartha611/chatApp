const db = require("../utils/db");
const MessageCollection = require("../Collections/MessageCollection");

exports.create = async (req, res) => {
  const { message } = req.body;
  const { id: channelId } = req.channel;
  try {
    const response = await db("messages")
      .insert({
        message,
        channelId,
        profileId: req.profile.id,
      })
      .returning("*")
      .then((row) => row[0]);
    return res
      .status(200)
      .send({ message: MessageCollection({ ...response, ...req.profile }) });
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
        "m.profileId",
        "p.fullName",
        "p.displayName",
        "p.avatar",
        "p.role"
      )
      .join("profiles AS p", "p.id", "=", "m.profileId")
      .where("m.channelId", req.channel.id)
      .orderBy("m.id");
    return res.status(200).send({
      messages: messages.map((message) => MessageCollection(message)),
      channel: req.channel,
    });
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
