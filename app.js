const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./server/routes/user');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/client/dist'));

app.use('/user', userRoutes);


app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
});

app.listen(3000, () => {
  console.log("You are listening on port 3000")
})