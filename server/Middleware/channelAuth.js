const db = require("../utils/db");

const channelAuth = async (req, res, next) => {
  const { id: userId } = req.user;
  const { channelId: shortid } = req.params;
  try {
    const channel = await db("channels AS c")
      .select(
        "c.id",
        "c.shortid",
        "c.name",
        "c.description",
        "c.teamId",
        "ut.role"
      )
      .join("userteams AS ut", "ut.teamId", "=", "c.teamId")
      .where({ shortid, userId })
      .first();
    if (channel) {
      req.role = channel.role;
      delete channel.role;
      req.channel = channel;
      return next();
    }
    return res.status(403).send("Not authorized or doesn't exist");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = channelAuth;
