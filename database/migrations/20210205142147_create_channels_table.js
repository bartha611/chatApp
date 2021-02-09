// eslint-disable-next-line no-unused-vars
const Knex = require("knex");

/**
 *
 * @param {Knex} knex
 */

exports.up = function(knex) {
  return knex.schema.createTable("channels", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("name", 80).notNullable();
    t.string("shortid", 14)
      .notNullable()
      .index();
    t.string("description").defaultTo("No Description");
    t.integer("teamId")
      .unsigned()
      .notNullable()
      .index();
    t.timestamps(true, true);

    t.foreign("teamId")
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");
  });
};

/**
 *
 * @param {Knex} knex
 */

exports.down = function(knex) {
  return knex.schema.dropTable("channels");
};
