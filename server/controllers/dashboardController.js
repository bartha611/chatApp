
exports.respond = function respond(socket) {
  socket.on('input', function send(data) {
    console.log(data);
    socket.broadcast.emit("message", data);
  })
}