const shortid = require("shortid");
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { name, team, description } = req.body;
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
      `INSERT INTO channel(shortid, name, description, teamId) VALUES ($1, $2, $3, $4) RETURNING name`,
      [shortid.generate(), name, description, teamId.rows[0].id]
    );
    console.log(response)
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    return res.status(404).send("error in creation");
  }
};
