// eslint-disable-next-line no-unused-vars
const Knex = require("knex");
/**
 *
 * @param {Knex} knex
 */

exports.up = function(knex) {
  return knex.schema.createTable("messages", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.text("message").notNullable();
    t.integer("profileId")
      .unsigned()
      .notNullable()
      .index();
    t.integer("channelId")
      .unsigned()
      .notNullable()
      .index();
    t.timestamps(true, true);

    t.foreign("profileId")
      .references("id")
      .inTable("profiles")
      .onDelete("CASCADE");
    t.foreign("channelId")
      .references("id")
      .inTable("channels")
      .onDelete("CASCADE");
  });
};
/**
 *
 * @param {Knex} knex
 */

exports.down = function(knex) {
  return knex.schema.dropTable("messages");
};
