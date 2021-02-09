// eslint-disable-next-line no-unused-vars
const Knex = require("knex");

/**
 *
 * @param {Knex} knex
 */

exports.up = function(knex) {
  return knex.schema.createTable("teams", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("name", 100).notNullable();
    t.string("shortid", 14)
      .notNullable()
      .index();
    t.integer("administrator")
      .unsigned()
      .notNullable();

    t.foreign("administrator")
      .references("id")
      .inTable("users");
  });
};

/**
 *
 * @param {Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable("teams");
};
