// eslint-disable-next-line no-unused-vars
const Knex = require("knex");

/**
 *
 * @param {Knex} knex
 */

exports.up = function(knex) {
  return knex.schema.createTable("profiles", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("fullName", 80).notNullable();
    t.string("displayName", 80).nullable();
    t.string("role", 100).nullable();
    t.string("avatar")
      .nullable()
      .defaultTo("https://flack611.s3.amazonaws.com/images/nightsky.jpg");
    t.string("shortid", 14)
      .notNullable()
      .index();
    t.integer("userId")
      .unsigned()
      .notNullable()
      .index();
    t.integer("teamId")
      .unsigned()
      .notNullable()
      .index();

    t.foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    t.foreign("teamId")
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");
    t.unique(["teamId", "userId"]);
  });
};

/**
 *
 * @param {Knex} knex
 */
exports.down = function(knex) {
  return knex.schema.dropTable("profiles");
};
