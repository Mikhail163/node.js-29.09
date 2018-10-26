const express = require('express');
const http = require('http');
const IO = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = IO(server);

io.on('connection', (socket) => {
  console.log('Someone has been connected');
  
  socket.on('message', (message) => {
    // TODO: Сохранить сообщение в БД
	socket.broadcast.emit('message', message);
	socket.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('Someone has disconnected');
  });
});

app.get('*', express.static(path.resolve(__dirname, '..', 'dist')));

server.listen(3000, () => {
  console.log('Server has been started');
});