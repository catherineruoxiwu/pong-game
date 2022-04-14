const http = require('http');
const socket = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = require('./sockets');

const io = socket(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

httpServer.listen(PORT);
console.log(`Listening on port ${PORT}`);

socketServer.listen(io);
