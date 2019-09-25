const { pool } = require('../configuration/pool');

exports.create = async (req, res) => {
  const { message, shortid } = req.body;
  const client = await pool.connect();
  try {
    const channelId = await client.query(`SELECT id FROM channel WHERE shortid = $1`, [shortid])
    const queryText = `INSERT INTO messages (message, userid, channelid) VALUES ($1, $2, $3) RETURNING message`;
    const { userId } = req.session;
    console.log(userId);
    if (!userId) {
      return res.status(404).send("No user logged in");
    }
    const { rows } = await client.query(queryText, [message, userId, channelId.rows[0].id]);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    return res.status(404).send("error in sending message")
  } finally {
    client.release();
  }
}
exports.read = async (req, res) => {
  const { shortid } = req.query;
  console.log(req.query);
  const client = await pool.connect();
  try {
    const queryText = 
    `SELECT m.message, u.username, m.createdAt 
    FROM messages m 
    JOIN users u ON (u.id = m.userid) 
    JOIN channel c ON (c.id = m.channelid)
    WHERE  c.shortid = $1`;
    const response = await client.query(queryText, [shortid]);
    console.log(response.rows);
    return res.status(200).send(response.rows);
  } catch (err) {
    console.log(err)
    return res.status(404).send(`Error in retrieving messages from ${shortid}`)
  } finally {
    client.release();
  }

}