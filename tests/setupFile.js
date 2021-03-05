const db = require("../server/utils/db");

module.exports = () =>
  db.migrate.latest().then(() => db.seed.run({ specific: "06_testSeeder.js" }));
