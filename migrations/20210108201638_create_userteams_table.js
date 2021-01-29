exports.up = function(knex) {
  return knex.schema.createTable("userteams", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
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
      .inTable("users");
    t.foreign("teamId")
      .references("id")
      .inTable("teams");
    t.unique(["userId", "teamId"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("userteams");
};
