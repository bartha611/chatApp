const shortid = require('shortid')
const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { team, open, username } = req.body;
  const client = await pool.connect();
  try {
    const oldTeam = await client.query(`SELECT * FROM Teams WHERE name = $1`, [
      team
    ]);
    if (oldTeam.rows[0]) {
      return res.status(404).send("Team name has already been taken");
    }
    const userId = await client.query(`SELECT id FROM users WHERE username = $1`, [username])
    await client.query("BEGIN");
    const queryText = `INSERT INTO Teams (name, open, shortId) VALUES ($1, $2, $3) RETURNING id`;
    const { rows } = await client.query(queryText, [team, open, shortid.generate()]);
    const insertGeneralChannel = `INSERT INTO channel (shortid, name, teamid, description) VALUES ($1, $2, $3, $4)`;
    await client.query(insertGeneralChannel, [shortid.generate(), "general", rows[0].id, "general channel"])
    const insertUserTeamText = `INSERT INTO userteams (userId, teamId) VALUES ($1, $2)`;
    await client.query(insertUserTeamText, [userId.rows[0].id, rows[0].id]);
    await client.query("COMMIT");

    return res.status(200).send("Success!!!");
  } catch (err) {
    await client.query("Rollback");
    return res.status(404).send("Error in team creation");
  } finally {
    client.release();
  }
};

exports.read = async (req, res) => {
  const { username } = req.query;
  const client = await pool.connect();
  try {
    const userId = await client.query(`SELECT id FROM users WHERE username = $1`, [username])
    const queryText = `SELECT t.id,t.name,t.shortid,t.open
    FROM Teams t 
    JOIN userteams ut ON (ut.teamId = t.id)  
    WHERE ut.userId = $1`;
    const { rows } = await client.query(queryText, [userId.rows[0].id]);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    res.status(404).send("Error retrieving teams");
  } finally {
    client.release();
  }
};
