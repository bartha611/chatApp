
exports.respond = function respond(socket) {
  socket.on('input', function send(data) {
    socket.broadcast.emit("message", data);
  })
}