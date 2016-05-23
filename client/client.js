(function() {
    'use strict';
    var pontoRoot = require('./ponto.root');
    var moment = require('moment');
    var io = require('socket.io-client')

    var events = require('events');
    var eventEmitter = new events.EventEmitter();


    console.log('Client started');


    //Add a connect listener
    var socket = io.connect('http://localhost:3000', {
        reconnect: true
    });

    //Fired when socket connects
    socket.on('connect', function() {
        console.log('connected');
    })

    //Fired when socket disconnects
    socket.on('disconnect', function() {
        console.log('disconected');
    })

    //Receive meassage from server
    socket.on('openClosePonto', function(data) {
        console.log('Connected', data.message);
    })
    //Send message to server
    function login(employeeCredentials) {
        console.log('executado o login', employeeCredentials);
        socket.emit('openClosePonto', {
            message: {
                action: 'open',
                empId: '100',
                password: '100000',
                date: moment().format()
            }
        })
    }


    //    setTimeout(function() {
    //        eventEmitter.emit('doorOpen')
    //    }, 3000);



    setInterval(function() {
        pontoRoot.openClose(function(employeeCredentials) {
            console.log(employeeCredentials);
            //registe the function
            if (employeeCredentials) {
                console.log('login válido');
                login(employeeCredentials)
                //            eventEmitter.on('doorOpen', login);
                //            eventEmitter.emit('doorOpen')
            }
        })
    }, 100)

})();
