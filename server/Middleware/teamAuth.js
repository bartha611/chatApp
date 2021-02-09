const db = require("../utils/db");

const teamAuth = async (req, res, next) => {
  const { id: userId } = req.user;
  const { teamId: shortid } = req.params;
  try {
    const team = await db("profiles AS p")
      .select("t.id", "t.name", "t.shortid", "t.administrator")
      .join("teams AS t", "t.id", "=", "p.teamId")
      .where("p.userId", userId)
      .andWhere("t.shortid", shortid)
      .first();
    if (team) {
      req.team = team;
      return next();
    }
    return res.status(403).send("Not authorized");
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = teamAuth;
