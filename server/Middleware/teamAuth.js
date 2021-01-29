const db = require("../utils/db");

const teamAuth = async (req, res, next) => {
  const { id: userId } = req.user;
  const { teamId: shortid } = req.params;
  try {
    const team = await db("userteams AS ut")
      .select("t.id", "t.name", "t.shortid", "t.administrator")
      .join("teams AS t", "t.id", "=", "ut.teamId")
      .where({ userId, shortid })
      .first();
    console.log(team);
    if (team) {
      req.team = team;
      return next();
    }
    return res.status(403).send("Not authorized");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = teamAuth;
