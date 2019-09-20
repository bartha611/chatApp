const { pool } = require('../configuration/pool');

exports.create = async (req, res) => {
  const { message } = req.body;
  const client = await pool.connect();
  try {

  } catch (err) {
    return res.status(404).send("error in sending message")
  }
}