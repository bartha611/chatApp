exports.up = function(knex) {
  return knex.schema.createTable("users", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.string("fullName").notNullable();
    t.string("username")
      .unique()
      .notNullable();
    t.string("avatar").nullable();
    t.string("email")
      .unique()
      .notNullable();
    t.string("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
