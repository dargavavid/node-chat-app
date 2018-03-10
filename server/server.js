const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User joined!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        // console.log('Create this message: ' + JSON.stringify(message, null, 2));
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server started up at ${port}`);
});
// console.log(__dirname + './../public');
// console.log(path.join(__dirname, './../public'));