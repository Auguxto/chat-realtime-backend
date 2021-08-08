import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

import cors from 'cors';

app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('user diconnected');
  });

  socket.on('send_chat_message', message => {
    console.log(message);
    socket.broadcast.emit('chat_message_received', message);
    // io.emit('chat_message_received', message);
  });
});

server.listen(3333, '192.168.0.106', () => console.log('Server is running'));
