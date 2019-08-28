const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const Fight = require('./fight');

const app = express();

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (socket) => {
  if(waitingPlayer){
    // Start the game
    new Fight(waitingPlayer, socket);

    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    waitingPlayer.emit('message', "Waiting for opponent");
  }
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(8080, () => {
  console.log(`Server started on 8080`);
});