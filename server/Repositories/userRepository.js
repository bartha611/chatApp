const bcrypt = require("bcryptjs");
const knex = require("knex");
const knexfile = require("../../knexfile");

const db = knex(knexfile.development);

exports.getUser = (username) => {
  return db
    .from("users")
    .select("username", "password")
    .where({ username })
    .first();
};

exports.createUser = async (username, rawPassword, email) => {
  const password = await bcrypt.hash(rawPassword, 10);
  return db
    .from("users")
    .insert({ username, password, email })
    .returning("id, username, email");
};
