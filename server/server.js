const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/../client/dist'));



app.listen(3000, () => {
  console.log("You are listening on port 3000")
})