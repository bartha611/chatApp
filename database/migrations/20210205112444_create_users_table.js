// eslint-disable-next-line no-unused-vars
const Knex = require("knex");

/**
 *
 * @param {Knex} knex
 */

exports.up = function(knex) {
  return knex.schema.createTable("users", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("email")
      .notNullable()
      .index();
    t.boolean("confirmed")
      .notNullable()
      .defaultTo(false);
    t.string("password").notNullable();

    t.unique("email");
  });
};

/**
 *
 * @param {Knex} knex
 */

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
