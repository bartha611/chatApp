const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { team, username } = req.body;
  const client = await pool.connect();
  try {
    const userId = await client.query(
      `SELECT id FROM person WHERE username = $1`,
      [username]
    );
    if (userId.rows.length === 0) {
      return res.status(404).send("User does not exist");
    }
    const teamId = await client.query(
      `SELECT id FROM team WHERE shortid = $1`,
      [team]
    );
    if (teamId.rows[0].length === 0) {
      return res.status(404).send("Team doesn't exist");
    }
    const existingMember = await client.query(
      `SELECT id FROM userteam WHERE userid = $1 AND teamid = $2`,
      [userId.rows[0].id, teamId.rows[0].id]
    );
    if (existingMember.rowCount !== 0) {
      return res.status(404).send("User already in team");
    }
    const queryText = `INSERT INTO userteam (userid, teamid) VALUES ($1, $2)`;
    await client.query(queryText, [userId.rows[0].id, teamId.rows[0].id]);
    return res.status(200).send("success!!!");
  } catch (err) {
    console.log(err);
    return res.status(404).send("error in creation");
  } finally {
    client.release();
  }
};

exports.read = async (req, res) => {
  const { team, username } = req.query;
  const client = await pool.connect();
  try {
    const queryText = `SELECT u.id, u.username
    FROM person u
    JOIN userteam ut ON (ut.userid = u.id)
    JOIN team t ON (t.id = ut.teamid)
    WHERE t.shortid = $1 AND t.shortid IN 
    (SELECT t.shortid
      FROM team t
      JOIN userteam ut ON (ut.teamid = t.id)
      JOIN person u ON (ut.userid = u.id)
      WHERE u.username = $2
      )
    `;
    const response = await client.query(queryText, [team, username]);
    return res.status(200).send(response.rows);
  } catch (err) {
    return res.status(404).send("error in reading data");
  } finally {
    client.release();
  }
};
