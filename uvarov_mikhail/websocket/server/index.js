const express = require('express');
const http = require('http');
const IO = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/test');

const app = express();
const server = http.Server(app);
const io = IO(server);

const Message = require('./models/message');

io.on('connection', (socket) => {
  console.log('Someone has been connected');

  socket.on('message', (message) => {
    const msg = new Message(message);
    msg.save().then((message) => {
      socket.broadcast.emit('message', message);
      socket.emit('message', message);
    });
  });

  socket.on('disconnect', () => {
    console.log('Someone has disconnected');
  });
});

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.get('*', express.static(path.resolve(__dirname, '..', 'dist')));

server.listen(3000, () => {
  console.log('Server has been started');
})