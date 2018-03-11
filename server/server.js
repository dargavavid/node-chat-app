const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;
const users = new Users();

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        
        // io.emit -> io.to('Some room').emit
        // socket.broadcast.emit -> socket.broadcast.to('Some room').emit
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));
        
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
        callback();
    });

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('Server says: got your message, all is good!');
    });

    socket.on('createLocationMessage', (coords) => {
        const {latitude, longitude} = coords;
        io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude));
    });

    socket.on('disconnect', () =>{
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`))
            // socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', 'User has disconnected!'));
        }
    });
});

server.listen(port, () => {
    console.log(`Server started up at ${port}`);
});
// console.log(__dirname + './../public');
// console.log(path.join(__dirname, './../public'));