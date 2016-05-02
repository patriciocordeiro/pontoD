'use strict'
//load packages
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;


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
    Id: {
        type: String,
        index: {
            unique: true
        }
    },
    password: String,
    ponto: [{
        data: {
            type: Date,
            default: Date.now()
        },
        horaEntrada: String,
        horaSaida: String,
        turnoEntrada: String,
        turnoSaida: String,
        day: String,
        year: String,
        month: String

    }]
})

/*Create a mongoose model*/
var employees = mongoose.model('employees', userSchema);

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
    employees.aggregate({
        $match: {
            working: true
        }
    }, {
        $unwind: "$ponto"
    }, {
        $match: {
            "ponto.day": "1"
        }
    }, function(err, data) {
        if (err) console.log(err)
        console.log('result', data);
        res.send(data);
    });

})

    //app.post('/openClosePonto', function(req, res) {
    //    console.log('Chegou do cliente', req.body);
    //    employees.find({id:req.body.empId.toString()}, function(err, data){
    //        if (err) console.log(err)
    //        console.log(data);
    //        res.send(data);
    //    });
    //
    //})
    ////
    app.post('/openClosePonto', function(req, res) {
        console.log('Chegou do cliente', req.body);
        employees.find({
            id: req.body.empId
        }, function(err, user) {
            if (err)
                console.log(err)
            console.log('employee data', user);
            if (!user[0]) {
                console.log('user not found');
                res.json({
                    res: 'noUser'
                });
            } else {
                if (req.body.password) {
                    if (user[0].password == req.body.password) {
                        employees.update({
                            id: req.body.empId
                        }, {
                            $set: {
                                working: req.body.working
                            }
                        }, function(err, data) {
                            if (err) console.log(err);
                            console.log(data);


                            if (data.ok == 1) {
                                if (data.nModified == 1) {
                                    console.log('Ponto Aberto');

                                    if (req.body.working == true) {
                                        /*Entrada*/
                                        employees.update({
                                            id: req.body.empId
                                        }, {
                                            $push: {
                                                ponto: req.body.ponto
                                            }
                                        }, function(err, data) {
                                            if (err) console.log(err);
                                            console.log(data);

                                        })
                                    } else if (req.body.working == false) {
                                        //                                    console.log(obj);
                                        /*Saída*/
                                        employees.update({
                                            "ponto._id": ObjectId(user[0].ponto[0]._id)
                                        }, {
                                            $set: {
                                                "ponto.$.horaSaida": req.body.ponto.horaSaida
                                            }
                                        }, function(err, data) {
                                            if (err) console.log(err);
                                            console.log(user[0].ponto[0]._id);
                                            console.log('Usúário saindo', data);

                                        })

                                    }

                                } else {
                                    console.log('O ponto já foi aberto');
                                }
                            }
                            res.send(data[0]);
                        })

                    } else {
                        console.log('wrong password');
                        res.json({
                            res: 'wrongPass'
                        });
                    }
                } else {
                    console.log('NO password');
                    res.json({
                        res: 'noPass'
                    });
                }
            }
            //            }
        });
    });

    app.listen(3000, function() {
        console.log('Example app listening on port 3000!');
    });
