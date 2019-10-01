const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { username, message, shortid, createdat } = req.body;
  const client = await pool.connect();
  try {
    const channelId = await client.query(
      `SELECT id FROM channel WHERE shortid = $1`,
      [shortid]
    );
    const userId = await client.query(
      `SELECT id FROM users WHERE username=$1`,
      [username]
    );
    const queryText = `INSERT INTO messages (message, userid, channelid, createdAt) VALUES ($1, $2, $3, $4) RETURNING message`;
    const { rows } = await client.query(queryText, [
      message,
      userId.rows[0].id,
      channelId.rows[0].id,
      createdat
    ]);
    rows[0].username = username;
    rows[0].createdat = createdat
    return res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(404).send("error in sending message");
  } finally {
    client.release();
  }
};
exports.read = async (req, res) => {
  const { shortid } = req.query;
  console.log(req.query);
  const client = await pool.connect();
  try {
    const queryText = `SELECT m.message, u.username, m.createdAt 
    FROM messages m 
    JOIN users u ON (u.id = m.userid) 
    JOIN channel c ON (c.id = m.channelid)
    WHERE  c.shortid = $1`;
    const response = await client.query(queryText, [shortid]);
    console.log(response.rows);
    return res.status(200).send(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(404).send(`Error in retrieving messages from ${shortid}`);
  } finally {
    client.release();
  }
};
