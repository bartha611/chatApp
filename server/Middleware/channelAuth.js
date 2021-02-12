const db = require("../utils/db");
const ChannelCollection = require("../Collections/ChannelCollection");
const ProfileCollection = require("../Collections/ProfileCollection");

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
        "p.id AS profileId",
        "p.fullName",
        "p.displayName",
        "p.avatar",
        "p.role",
        "p.shortid AS profileShortid"
      )
      .join("profiles AS p", "p.teamId", "=", "c.teamId")
      .where("c.shortid", shortid)
      .andWhere("p.userId", userId)
      .first();
    if (channel) {
      req.channel = ChannelCollection(channel);
      req.profile = ProfileCollection(channel);
      return next();
    }
    return res.status(403).send("Not authorized or doesn't exist");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = channelAuth;
