const shortid = require("shortid");
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { team, open, username } = req.body;
  const client = await pool.connect();
  try {
    const oldTeam = await client.query(`SELECT id FROM Teams WHERE name = $1`, [
      team
    ]);
    if (oldTeam.rows[0]) {
      return res.status(404).send("Team name has already been taken");
    }
    const userId = await client.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );
    await client.query("BEGIN");
    const queryText = `INSERT INTO Teams (name, open, shortId, userid) VALUES ($1, $2, $3, $4) RETURNING id`;
    const { rows } = await client.query(queryText, [
      team,
      open,
      shortid.generate(),
      userId.rows[0].id
    ]);
    const insertGeneralChannel = `INSERT INTO channel (shortid, name, teamid, description) VALUES ($1, $2, $3, $4) RETURNING id`;
    const channel = await client.query(insertGeneralChannel, [
      shortid.generate(),
      "general",
      rows[0].id,
      "general channel"
    ]);
    const insertUserTeamText = `INSERT INTO userteams (userId, teamId) VALUES ($1, $2)`;
    await client.query(insertUserTeamText, [userId.rows[0].id, rows[0].id]);
    const newMessageText = `INSERT INTO messages (message, userid, channelid) VALUES ($1, $2, $3)`;
    await client.query(newMessageText, [
      `Joined ${team}`,
      userId.rows[0].id,
      channel.rows[0].id
    ]);
    await client.query("COMMIT");
    return res.status(200).send("Success!!!");
  } catch (err) {
    await client.query("Rollback");
    console.log(err);
    return res.status(404).send("Error in team creation");
  } finally {
    client.release();
  }
};

exports.read = async (req, res) => {
  const { username } = req.query;
  const client = await pool.connect();
  try {
    const userId = await client.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );
    const queryText = `SELECT t.shortid, t.name, MAX(to_char(m.createdat, 'YYYY-MM-DD HH:MI')) AS last_updated
    FROM Teams t 
    JOIN userteams ut ON (ut.teamId = t.id)
    JOIN channel c ON (c.teamid = t.id)
    JOIN messages m ON (m.channelid = c.id)
    WHERE ut.userId = $1
    GROUP BY t.shortid, t.name
    ORDER BY last_updated DESC
    `;
    const { rows } = await client.query(queryText, [userId.rows[0].id]);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.status(404).send("Error retrieving teams");
  } finally {
    client.release();
  }
};
