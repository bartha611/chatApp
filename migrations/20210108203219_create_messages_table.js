exports.up = function(knex) {
  return knex.schema.createTable("messages", function(t) {
    t.increments("id")
      .unsigned()
      .notNullable()
      .primary();
    t.text("message").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.integer("userId")
      .unsigned()
      .notNullable()
      .index();
    t.integer("channelId")
      .unsigned()
      .notNullable()
      .index();

    t.foreign("userId")
      .onDelete("CASCADE")
      .references("id")
      .inTable("users");
    t.foreign("channelId")
      .onDelete("CASCADE")
      .references("id")
      .inTable("channels");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("messages");
};
