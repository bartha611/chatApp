const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
require("dotenv").config();

const PORT = 8080;

const userRoutes = require("./Routes/userRoute");
const teamRoutes = require("./Routes/teamRoute");
const channelRoutes = require("./Routes/channelRoute");
const messageRoutes = require("./Routes/messageRoute");
const memberRoutes = require("./Routes/memberRoute");

io.on("connect", (socket) => {
  socket.on("join", (channel) => {
    console.log(`joined ${channel}`);
    socket.join(channel);
  });
  socket.on("input", ({ shortid, ...rest }) => {
    socket.to(shortid).emit("message", rest);
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

app.use("/api/user", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/teams/:teamId/channels", channelRoutes);
app.use("/api/channels/:channelId/messages", messageRoutes);
app.use("/api/teams/:teamId/members", memberRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
