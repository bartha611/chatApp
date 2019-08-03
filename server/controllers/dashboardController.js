
exports.respond = function(socket) {
  socket.on('input', function(data) {
    console.log(data);
    socket.broadcast.emit("message", data);
  })
}