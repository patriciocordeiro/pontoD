var moment = require('moment
var io = require('socket.io-client')

var events = require('events');
var eventEmitter = new events.EventEmitter();

console.log('Client started');


//Add a connect listener
var socket = io.connect('http://localhost:3000', {
    reconnect: true
});
//Receive meassage from server
socket.on('openClosePonto', function(data) {
    console.log('Connected', data.message);
})
//Send message to server
var login = function login() {
    console.log('executado o login');
    socket.emit('openClosePonto', {
        message: {
            action: 'open',
            empId: '100',
            password: '100000',
            date: moment().format()
        }
    })
}


eventEmitter.on('doorOpen', login);
setTimeout(function() {
    eventEmitter.emit('doorOpen')
}, 3000);



//Fired when socket connects
socket.on('connect', function() {
    console.log('connected');
})

//Fired when socket disconnects
socket.on('disconnect', function() {
    console.log('disconected');
})
