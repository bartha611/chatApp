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
  const { team, username } = req.query;
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
    if (teamId.rowCount === 0) {
      return res.status(404).send("Team doesn't exist");
    }
    const queryText = `SELECT * 
    FROM channel 
    WHERE teamId = $1 AND teamId IN 
    (SELECT t.id
      FROM teams t
      JOIN userteams ut ON (ut.teamid = t.id)
      JOIN users u ON (u.id = ut.userid)
      WHERE u.username = $2)
    ORDER BY createdat ASC`;
    const response = await client.query(queryText, [
      teamId.rows[0].id,
      username
    ]);
    console.log(response);
    if (response.rowCount === 0) {
      return res.status(404).send("User not authorized");
    }
    return res.status(200).send(response.rows);
  } catch (err) {
    return res.status(404).send(err);
  } finally {
    client.release();
  }
};
