exports.up = function(knex) {
  return knex.schema.createTable("channels", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("name").notNullable();
    t.string("shortid")
      .notNullable()
      .index();
    t.text("description").defaultTo("Add Topic");
    t.integer("teamId")
      .unsigned()
      .notNullable();
    t.timestamps(true, true);

    t.foreign("teamId")
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("channels");
};
