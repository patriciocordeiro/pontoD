'use strict'
//load packages
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');


/*MONGODB--------------------------------------------------*/
mongoose.connect('mongodb://localhost/pontoD');
//check if connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connected to database')
});
/*--------------------------------------------------------------*/
/*Crete a mongoose Schema*/
var userSchema = new mongoose.Schema({
    working: Boolean,
    name: String,
    id: {
        type: Number,
        index: {
            unique: true
        }
    },
    password: Number,
})

/*Create a mongoose model*/
var user = mongoose.model('user', userSchema);

///*Create new user*/
//var newUSer = new user({
//    name: 'yasmin',
//    id: 1902 ,
//    password: 1256,
//})

/*Express config*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); // get information from html forms
//use static files
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getOpenPonto', function(req, res) {
    console.log('Chegou do cliente', req.body);
    user.find({}, function(err, data){
        if (err) console.log(err)
        console.log(data);
        res.send(data);
    });

})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
