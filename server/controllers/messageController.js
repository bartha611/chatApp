const moment = require("moment-timezone");

const { pool } = require("../configuration/pool");

exports.create = async (req, res) => {
  const { username, input, channel, zone } = req.body;
  const client = await pool.connect();
  try {
    const channelId = await client.query(
      `SELECT id FROM channel WHERE shortid = $1`,
      [channel]
    );
    const userId = await client.query(
      `SELECT id FROM users WHERE username=$1`,
      [username]
    );
    const queryText = `INSERT INTO messages (message, userid, channelid) VALUES ($1, $2, $3) RETURNING message, createdAt`;
    const { rows } = await client.query(queryText, [
      input,
      userId.rows[0].id,
      channelId.rows[0].id
    ]);
    rows[0].username = username;
    rows[0].shortid = channel;
    rows[0].createdat = moment(rows[0].createdat)
      .tz(zone)
      .format("YYYY-MM-DD h:mm A");
    console.log(rows);
    return res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(404).send("error in sending message");
  } finally {
    client.release();
  }
};
exports.read = async (req, res) => {
  const { channel, zone } = req.query;
  const client = await pool.connect();
  try {
    const queryText = `SELECT m.message, u.username, to_char(m.createdat AT TIME ZONE '${zone}' , 'YYYY-MM-DD HH:MI AM') AS createdat, c.description, c.name
    FROM messages m 
    JOIN users u ON (u.id = m.userid) 
    JOIN channel c ON (c.id = m.channelid)
    WHERE  c.shortid = $1
    ORDER BY createdat ASC`;
    const response = await client.query(queryText, [channel]);
    console.log(response.rows);
    return res.status(200).send(response.rows);
  } catch (err) {
    console.log(err);
    return res.status(404).send(`Error in retrieving messages from ${channel}`);
  } finally {
    client.release();
  }
};
