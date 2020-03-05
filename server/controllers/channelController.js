const shortid = require("shortid");
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { username, name, team, description } = req.body;
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
    const userId = await client.query(
      `SELECT id
      FROM users 
      WHERE username = $1`,
      [username]
    );
    await client.query("BEGIN");
    const response = await client.query(
      `INSERT INTO channel(shortid, name, description, teamId) VALUES ($1, $2, $3, $4) RETURNING id, shortid, name, description`,
      [shortid.generate(), name, description, teamId.rows[0].id]
    );
    const newMessageText = `INSERT INTO messages(message,userid, channelid) VALUES ($1, $2, $3)`;
    await client.query(newMessageText, [
      `Joined ${response.rows[0].name}`,
      userId.rows[0].id,
      response.rows[0].id
    ]);
    await client.query("COMMIT");
    return res.status(200).send(response.rows[0]);
  } catch (err) {
    await client.query("Rollback");
    return res.status(404).send(err);
  } finally {
    client.release();
  }
};

exports.read = async (req, res) => {
  const { team } = req.query;
  const { username } = req;
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
    if (response.rowCount === 0) {
      return res.status(403).send("User not authorized");
    }
    return res.status(200).send(response.rows);
  } catch (err) {
    return res.status(404).send(err);
  } finally {
    client.release();
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const client = pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM message WHERE channelId = $1", [id]);
    await client.query("DELETE FROM channel WHERE id = $1", [id]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    res.sendStatus(500).send("Couldn't delete channel");
  } finally {
    client.release();
  }
};
