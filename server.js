'use strict';
//load packages
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

//----------------------------------------------------------------------
//my methods
var employees = require('./server/ponto.models')
var pontoApi = require('./server/pontoApi');
var pontoWeb = require('./server/pontoWeb');
var employeesWeb = require('./server/employeesWeb');
var routes = require('./server/ponto.routes')

//----------------------------------------------------------------------

/*MONGODB--------------------------------------------------*/
mongoose.connect('mongodb://localhost/pontoD');
//check if connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connected to database')
});
/*--------------------------------------------------------------*/

/*Express config*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); // get information from html forms

//use static files
app.use(express.static(path.join(__dirname, '/')));

/*Routes*/
//load my rouxtes
require('./server/ponto.routes')(app, express, pontoWeb)
require('./server/employees.routes')(app, express, employeesWeb)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


/*SOCKET IO*/

io.on('connection', function(socket) {
    socket.on('openClosePonto', function(data) {
        console.log('A client sent us this dumb message:', data.message);
        if (data.message.action === 'open') {
            pontoApi.getOpenPonto(data.message, function(res) {
                console.log('resposta da abertura do ponto', res);
                //sent response back to client
                socket.emit('openClosePonto', {
                    message: res
                });
            })
        } else if (data.message.action === 'close') {
            pontoApi.getClosePonto(data.message, function(res) {
                console.log('resposta de fechamento do ponto', res);

                //sent response back to client
                socket.emit('openClosePonto', {
                    message: res
                });
            })
        }
    });



    socket.emit('openClosePonto', {
        message: 'Hey, SOU O SERVER na máquina do patricio!'
    });
});

server.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
