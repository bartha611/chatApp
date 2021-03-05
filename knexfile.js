// Update with your config settings.
require("dotenv").config();

module.exports = {
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      port: process.env.DB_POST,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    useNullAsDefault: true,
    log: {
      warn(message) {
        return;
      },
    },
  },
};
