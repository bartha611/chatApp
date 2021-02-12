const db = require("../utils/db");
const TeamCollection = require("../Collections/TeamCollection");
const ProfileCollection = require("../Collections/ProfileCollection");

const teamAuth = async (req, res, next) => {
  const { id: userId } = req.user;
  const { teamId: shortid } = req.params;
  try {
    const team = await db("profiles AS p")
      .select(
        "t.id",
        "t.name",
        "t.shortid",
        "t.administrator",
        "p.id AS profileId",
        "p.fullName",
        "p.displayName",
        "p.avatar",
        "p.shortid AS profileShortid",
        "p.role"
      )
      .join("teams AS t", "t.id", "=", "p.teamId")
      .where("p.userId", userId)
      .andWhere("t.shortid", shortid)
      .first();
    if (team) {
      req.team = TeamCollection(team);
      req.profile = ProfileCollection(team);
      return next();
    }
    return res.status(403).send("Not authorized");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = teamAuth;
