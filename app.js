const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
// session creation
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


// import routes
const userRoutes = require('./server/routes/userRoute');
const teamRoutes = require('./server/routes/teamRoute');
const userTeamRoutes = require('./server/routes/userTeamRoute');
const dashboardController = require('./server/controllers/dashboardController');



const PORT = 3000;

io
.of('/chat')
.on('connection', dashboardController.respond);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: process.env.SESSION_STORE,
    ttl: 60*60
  })
}))
app.use(express.static(`${__dirname  }/client/dist`));

// routes
app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/userTeam', userTeamRoutes);

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
});

server.listen(PORT, () => {
})
