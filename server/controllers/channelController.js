const shortid = require("shortid");
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { name, team, description } = req.body;
  console.log(`name: ${name} team: ${team} description: ${description}`);
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
      WHERE shortid = $1`,
      [team]
    );
    const response = await client.query(
      `INSERT INTO channel(shortid, name, description, teamId) VALUES ($1, $2, $3, $4) RETURNING id, shortid, name, description`,
      [shortid.generate(), name, description, teamId.rows[0].id]
    );
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(404).send(err);
  } finally {
    client.release();
  }
};

exports.read = async (req, res) => {
  const { team } = req.query;
  const client = await pool.connect();
  try {
    const teamId = await client.query(
      `
    SELECT id
    FROM teams
    WHERE shortId = $1
    `,
      [team]
    );
    const queryText = `SELECT * 
    FROM Channel 
    WHERE teamId = $1
    ORDER BY createdat ASC`;
    const { rows } = await client.query(queryText, [teamId.rows[0].id]);
    res.status(200).send(rows);
  } catch (err) {
    res.status(404).send(err);
  } finally {
    client.release();
  }
};
