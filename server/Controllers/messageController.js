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
      .returning("id")
      .then((row) => row[0]);
    const newMessage = await db("messages")
      .select("*")
      .where("id", response)
      .limit(1)
      .then((row) => row[0]);
    delete req.profile.id;
    return res
      .status(200)
      .send({ message: MessageCollection({ ...newMessage, ...req.profile }) });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.read = async (req, res) => {
  try {
    let messages = await db("messages AS m")
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
      .modify(function(queryBuilder) {
        if (req.query.cursor) {
          queryBuilder.andWhere("m.id", "<=", req.query.cursor);
        }
      })
      .orderBy("m.id", "desc")
      .limit(51);
    const cursor = messages.length > 50 ? messages[50].id : null;
    messages = messages.length > 50 ? messages.slice(0, 49) : messages;
    return res.status(200).send({
      messages: messages.reverse().map((message) => MessageCollection(message)),
      channel: req.channel,
      cursor,
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
