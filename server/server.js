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
    // console.log('new user connected');

    // socket.emit('newEmail', {
    //     from: 'kek@gmail.com',
    //     text: 'Hello',
    //     createdAt: new Date()
    // });

    // socket.on('createEmail', (emailToCreate) => {
    //     console.log(emailToCreate)
    // });
    socket.emit('newMessage', {
        from: 'kek@gmail.com',
        text: 'hi',
        createdAt: Date.now()
    });

    socket.on('createMessage', (message) => {
        console.log('Create this message: ' + JSON.stringify(message, null, 2));
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