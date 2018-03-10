var socket = io();

socket.on('connect', function() {
    // console.log('connected to server');
    // socket.emit('createEmail', {
    //     to: 'kek@gmail.com',
    //     text: 'Hi'
    // });
    socket.emit('createMessage', {
        from: 'jej@gmail.com',
        text: 'hello'
    });
});

socket.on('newMessage', function(message) {
    console.log('Got new message: ', message);
});

// socket.on('disconnect', function() {
//     console.log('disconnected from server');
// });

// socket.on('newEmail', function(email) {
//     console.log('New email.', email)
// });