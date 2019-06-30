const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./server/routes/user');
// const dashboardRoutes = require('./server/routes/dashboard');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('hello, you are connected');
  socket.on('input', (inputUser) => {
    console.log(inputUser);
    socket.broadcast.emit("message", inputUser)})
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/client/dist'));

app.use('/user', userRoutes);
// app.use('/dashboard', dashboardRoutes);


app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
});

server.listen(3000, () => {
  console.log("You are listening on port 3000")
})