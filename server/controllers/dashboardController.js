exports.respond = function(socket) {
  socket.on('message', function(data) {
    socket.broadcast.to(data.id).emit(data.message)
  })
}