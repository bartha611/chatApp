exports.up = function(knex) {
  return knex.schema.createTable("teams", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("name").notNullable();
    t.string("shortid")
      .notNullable()
      .index();
    t.boolean("open").defaultTo(false);
    t.integer("administrator")
      .unsigned()
      .notNullable();

    t.foreign("administrator")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("teams");
};
