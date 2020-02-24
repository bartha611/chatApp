const shortid = require("shortid");
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { team, open } = req.body;
  const { username } = req;
  const client = await pool.connect();
  try {
    const oldTeam = await client.query(`SELECT id FROM team WHERE name = $1`, [
      team
    ]);
    if (oldTeam.rows[0]) {
      return res.status(404).send("Team name has already been taken");
    }
    const userId = await client.query(
      `SELECT id FROM person WHERE username = $1`,
      [username]
    );
    await client.query("BEGIN");
    const queryText = `INSERT INTO team (name, open, shortId, administrator) VALUES ($1, $2, $3, $4) RETURNING id, name, shortId`;
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
    const insertUserTeamText = `INSERT INTO userteam (userId, teamId) VALUES ($1, $2)`;
    await client.query(insertUserTeamText, [userId.rows[0].id, rows[0].id]);
    const newMessageText = `INSERT INTO message (message, userid, channelid, teamId) VALUES ($1, $2, $3, $4)`;
    await client.query(newMessageText, [
      `Joined ${team}`,
      userId.rows[0].id,
      channel.rows[0].id,
      rows[0].id
    ]);
    await client.query("COMMIT");
    return res.status(200).send(rows[0]);
  } catch (err) {
    await client.query("Rollback");
    return res.status(404).send(err);
  } finally {
    client.release();
  }
};

exports.read = async (req, res) => {
  const { username } = req;
  const client = await pool.connect();
  try {
    const userId = await client.query(
      `SELECT id FROM person WHERE username = $1`,
      [username]
    );
    const queryText = `SELECT t.shortid, t.name, MAX(to_char(m.createdat, 'YYYY-MM-DD HH:MI')) AS last_updated
    FROM team t 
    JOIN userteam ut ON (ut.teamId = t.id)
    JOIN channel c ON (c.teamid = t.id)
    JOIN message m ON (m.channelid = c.id)
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

exports.delete = async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`DELETE FROM message WHERE teamId = $1`, [id]);
    await client.query(`DELETE FROM userTeam WHERE teamId = $1`, [id]);
    await client.query(`DELETE FROM channel WHERE teamid = $1`, [id]);
    await client.query(`DELETE FROM team WHERE id = $1`, [id]);
    await client.query(`COMMIT`);
    return res.sendStatus(200);
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    return res.status(404).send(err);
  } finally {
    client.release();
  }
};
