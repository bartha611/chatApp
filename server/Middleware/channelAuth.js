const db = require("../utils/db");

const channelAuth = async (req, res, next) => {
  const { id: userId } = req.user;
  const { channelId: shortid } = req.params;
  try {
    const channel = await db("channels AS c")
      .select("c.id", "c.shortid", "c.name", "c.description", "c.teamId")
      .join("profiles AS p", "p.teamId", "=", "c.teamId")
      .where("c.shortid", shortid)
      .andWhere("c.userId", userId)
      .first();
    if (channel) {
      req.channel = channel;
      return next();
    }
    return res.status(403).send("Not authorized or doesn't exist");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = channelAuth;
