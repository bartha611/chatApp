const moment = require("moment-timezone");

const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { username, message, shortid, zone } = req.body;
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
    const queryText = `INSERT INTO messages (message, userid, channelid) VALUES ($1, $2, $3) RETURNING message, createdAt`;
    const { rows } = await client.query(queryText, [
      message,
      userId.rows[0].id,
      channelId.rows[0].id
    ]);
    rows[0].username = username;
    console.log(rows[0].createdat);
    rows[0].createdat = moment(rows[0].createdat)
      .tz(zone)
      .format("YYYY-MM-DD h:mm A");
    return res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(404).send("error in sending message");
  } finally {
    client.release();
  }
};
exports.read = async (req, res) => {
  const { shortid, zone } = req.query;
  const client = await pool.connect();
  try {
    const queryText = `SELECT m.message, u.username, to_char(m.createdat AT TIME ZONE '${zone}', 'YYYY-MM-DD HH:MI AM') AS createdat
    FROM messages m 
    JOIN users u ON (u.id = m.userid) 
    JOIN channel c ON (c.id = m.channelid)
    WHERE  c.shortid = $1`;
    const response = await client.query(queryText, [shortid]);
    return res.status(200).send(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(404).send(`Error in retrieving messages from ${shortid}`);
  } finally {
    client.release();
  }
};
