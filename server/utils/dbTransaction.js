const db = require("./db");

function createTransaction() {
  return new Promise((resolve) => {
    return db.transaction(resolve);
  });
}

module.exports = createTransaction;
