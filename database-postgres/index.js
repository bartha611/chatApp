const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error requiring whatever: ', err.stack)
//   }
//   return console.log("It is connected")
// })

const createTables = () => {
  queryText = `CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, 
              username VARCHAR(50), 
              email VARCHAR(50), 
              password VARCHAR(60))`;
  pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end()
  })
  .catch((err) => {
    console.log(err);
    pool.end()
  })
}


  
module.exports = {
  createTables,
  pool
}
require('make-runnable');
