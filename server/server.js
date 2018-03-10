const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const generateMessage = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User connected!'));

    socket.on('createMessage', (message) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () =>{
        socket.broadcast.emit('newMessage', generateMessage('Admin', 'User has disconnected!'));
    });
});

server.listen(port, () => {
    console.log(`Server started up at ${port}`);
});
// console.log(__dirname + './../public');
// console.log(path.join(__dirname, './../public'));