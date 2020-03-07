const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
// session creation
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// import routes
const userRoutes = require("./server/routes/userRoute");
const teamRoutes = require("./server/routes/teamRoute");
const channelRoutes = require("./server/routes/channelRoute");
const messageRoutes = require("./server/routes/messageRoute");
const memberRoutes = require("./server/routes/memberRoute");

const PORT = 8080;
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sessionMiddleWare = session({
  secret: "lsadjflksajfjsafkdsaj",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: process.env.SESSION_STORE
  })
});

app.use(sessionMiddleWare);
app.use(express.static(`${__dirname}/client/dist`));

io.use((socket, next) => {
  sessionMiddleWare(socket.request, socket.request.res, next);
});

io.on("connection", socket => {
  socket.on("join", channel => {
    socket.join(channel);
  });
  socket.on("input", ({ shortid, ...rest }) => {
    socket.to(shortid).emit("message", rest);
  });
});

// routes
app.use("/user", userRoutes);
app.use("/team", teamRoutes);
app.use("/channel", channelRoutes);
app.use("/message", messageRoutes);
app.use("/member", memberRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
