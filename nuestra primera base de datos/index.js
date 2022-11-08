import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

import { chatRouter, productRouter } from './src/router/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', productRouter)
app.use('/api/chat', chatRouter)

app.get('*', (req, res) => {
  res.send('404')
})

io.on('connection', socket => {
  socket.on('new-message', async (data) => {
    io.sockets.emit('messages-push', data);
  })
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`app running at port ${PORT}`))