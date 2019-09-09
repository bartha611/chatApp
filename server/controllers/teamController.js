const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { team, open } = req.body;
  const client = await pool.connect();
  const { userId } = req.session;
  try {
    const oldTeam = await client.query(`SELECT * FROM Teams WHERE name = $1`, [
      team
    ]);
    if (oldTeam.rows[0]) {
      return res.status(404).send("Team name has already been taken");
    }
    await client.query("BEGIN");
    const queryText = `INSERT INTO Teams (name, open) VALUES ($1, $2) RETURNING id`;
    const { rows } = await client.query(queryText, [team, open]);
    const insertUserTeamText = `INSERT INTO userteams (userId, teamId) VALUES ($1, $2)`;
    await client.query(insertUserTeamText, [userId, rows[0].id]);
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
  const { userId } = req.session;
  const client = await pool.connect();
  try {
    const queryText = `SELECT t.name 
    FROM Teams t 
    JOIN userteams ut ON (ut.teamId = t.id)  
    WHERE ut.userId = $1`;
    const { rows } = await client.query(queryText, [userId]);
    res.status(200).send(rows);
  } catch (err) {
    res.status(404).send("Error retrieving teams");
  } finally {
    client.release();
  }
};
