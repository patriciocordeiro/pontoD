var app = require('express')();
//var express = require('express');
//var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/socketIndex.html');
});

server.listen(3000);
console.log('server listening at port 3000');

io.on('connection', function(socket) {
    socket.emit('announcements', { message: 'A new user has joined!' });
});

io.on('connection', function(socket) {
    socket.on('event', function(data) {
        console.log('A client sent us this dumb message:', data.message);
    });
});
