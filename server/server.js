const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./../database-postgres/index.js');
const path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/../client/dist'));


app.post('/login', function(req,res) {
  const { username, password } = req.body;
  const text = `INSERT INTO Users(username,password) VALUES($1,$2) RETURNING * `;
  const values = [username,password];
  pool.query(text,values)
  .then((res) => {
    console.log(res.rows[0])
  })
  .catch((e) => {
    console.error(e.stack)
  })
})

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});


app.get('/users', function(req,res) {
  const queryText = `SELECT * FROM Users`;
  pool.query(queryText)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e.stack);
  })
})

app.listen(3000, () => {
  console.log("You are listening on port 3000")
})