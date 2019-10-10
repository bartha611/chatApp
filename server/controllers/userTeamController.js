const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { teamname, username } = req.body;
  const client = await pool.connect();
  try {
    const userId = await client.query(`SELECT id FROM users WHERE name = $1`, [
      username
    ]);
    if (userId.rows[0].length === 0) {
      return res.status(404).send("User does not exist");
    }
    const teamId = await client.query(`SELECT id FROM teams WHERE team = $1`, [
      teamname
    ]);
    if (teamId.rows[0].length === 0) {
      return res.status(404).send("Teamname doesn't exist");
    }
    const queryText = `INSERT INTO userteams (userid, teamid) VALUES ($1, $2)`;
    await client.query(queryText, [userId.rows[0].id, teamId.rows[0].id]);
    return res.status(200).send("success!!!");
  } catch (err) {
    console.log(err);
    return res.status(404).send("error in creation");
  } finally {
    client.release();
  }
};
