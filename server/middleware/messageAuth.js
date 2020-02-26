const { pool } = require("../configuration/pool");

const messageAuth = async (req, res, next) => {
  const { id } = req.params;
  const { username } = req;
  const client = await pool.connect();
  try {
    const queryText = `SELECT username 
    FROM user u 
    JOIN message m ON (m.userId = u.id) 
    WHERE m.id = $1`;
    const { rows } = await client.query(queryText, [id]);
    if (rows[0].username === username) {
      next();
    } else {
      res.sendStatus(403).send("Not authorized to delete or update message");
    }
  } catch (err) {
    next(err);
  } finally {
    client.release();
  }
};

module.exports = messageAuth;
