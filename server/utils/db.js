const knex = require("knex");
const knexfile = require("../../knexfile");

module.exports = knex(
  process.env.NODE_ENV === "test" ? knexfile.development : knexfile.production
);
