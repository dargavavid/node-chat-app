var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('connected to server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/'; 
        } else {
            console.log('No error.');
        }
    });
});

socket.on('disconnect', function() {

});

socket.on('updateUserList', function(userList) {
    var ol = jQuery('<ol></ol>');
    userList.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    // console.log('Got new message: ', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a></a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // a.attr('target', '_blank');
    // a.text('My current location (will open new tab)');
    // li.append(a);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Dave',
//     text: 'BTF'
// }, function(response) {
//     console.log(response);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var $messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        text: $messageTextbox.val()
    }
    , function(response) {
        // console.log(response);
        $messageTextbox.val('');
    });
});

var $locationButton = jQuery('#send-location');
$locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by yours browser.');
    }
    $locationButton.prop('disabled', true);
    $locationButton.text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position);
        $locationButton.prop('disabled', false);
        $locationButton.text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(err) {
        alert('Unable to fetch location.');
        $locationButton.prop('disabled', false);
    });
});