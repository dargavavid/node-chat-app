var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('newMessage', function(message) {
    console.log('Got new message: ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Dave',
//     text: 'BTF'
// }, function(response) {
//     console.log(response);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(response) {
        console.log(response);
        jQuery('[name=message]').val('')
    });
});