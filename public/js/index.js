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

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a></a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    a.attr('target', '_blank');
    a.text('My current location (will open new tab)');
    li.append(a);
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
        // console.log(response);
        jQuery('[name=message]').val('')
    });
});

var $locationButton = jQuery('#send-location');
$locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by yours browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(err) {
        alert('Unable to fetch location.');
    });
});