const listen = (io) => {
  let readyPlayerCount = 0;

  io.on('connection', (socket) => {
    let room;

    socket.on('ready', () => {
      room = 'room' + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log('PLayer ready', socket.id, room);
      readyPlayerCount++;
      console.log(readyPlayerCount);
      if (readyPlayerCount % 2 === 0) {
        io.in(room).emit('startGame', socket.id);
      }
    });

    socket.on('paddleMove', (paddleData) => {
      socket.broadcast.to(room).emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
      socket.broadcast.to(room).emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });

  });
};

module.exports = {
  listen,
};
