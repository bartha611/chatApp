const { pool } = require("../configuration/pool");

const teamAuth = async (req, res, next) => {
  const { username } = req;
  const { id } = req.params;
  const client = await pool.connect();
  try {
    const queryText = `SELECT administrator FROM team WHERE id = $1`;
    const { rows } = await client.query(queryText, [id]);
    if (rows[0].administrator === username) {
      next();
    } else {
      res.status(403).send("Not authorized to delete");
    }
  } catch (error) {
    next(error);
  } finally {
    client.release();
  }
};

module.exports = teamAuth;
