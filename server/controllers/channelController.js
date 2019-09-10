const shortid = require("shortid");
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { name, team } = req.body;
  const client = await pool.connect();
  try {
    const oldChannel = await client.query(
      `SELECT c.id
      FROM channel c
      JOIN teams t ON (t.id = c.teamId)
      WHERE c.name = $1`,
      [name]
    );
    if (oldChannel.rows[0]) {
      return res.status(404).send("Channel already taken");
    }
    const teamId = await client.query(
      `SELECT id
      FROM teams
      WHERE name = $1`,
      [team]
    );
    const response = await client.query(
      `INSERT INTO channel(shortid, name, teamId) VALUES ($1, $2, $3) RETURNING name`,
      [shortid.generate(), name, teamId.rows[0].id]
    );
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Error in creation");
  }
};
