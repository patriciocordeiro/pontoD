'use strict'
//load packages
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

/*global variables*/
var minWorkHours = '01:00:00'; //minimo de horas para considerar trabalho
var maxWorkHours = '04:00:00'; //máximo de horas para não considera hora extra
var maxTimeInTurno1 = '08:15:00';
var maxTimeInTurno2 = '14:15:00';

/*global functions*/
//function getworkedHours(inTime, outTime) {
//    return var workedHours = outTime - inTime;
//
//}
//
//function getExtraHours(workedHours, maxWorkHours) {
//    if (workedHours > maxWorkHour) {
//        return var extraTime = workedHours - maxWorkHours;
//    }
//}
//
//function getFaultHours(workedHours, maxWorkHours) {
//    if (workedHours < maxWorkHour) {
//        return var faultHours = workedHours - maxWorkHours;
//    }
//}
//
//function getTotalExtraHours(extraHoursFirstPeriod, extraHoursSecondPeriod) {
//    return var totalExtraHours = extraHoursFirstPeriod + extraHoursSecondPeriod
//}
//
//function getTotalFaultHours(faultHoursFirstPeriod, faultHoursSecondPeriod) {
//    return var totalFaultHours = faultHoursFirstPeriod + faultHoursSecondPeriod
//}


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
        fullDate: {
            type: Date,
            default: Date.now()
        },
        date:{
            year:String,
            month:String,
            weekDay:String,
            day:String,
        },
        totalExtraTime: String,
        totalFaultTime: String,
        turno1: {
            inTime: String, //hora de entrada
            outTime: String, // Hora de saida
            worked: Boolean, //Sinaliza se trabalhou
            isDelayedIn: Boolean, //sinaliza se entrou atrasado
            isDelayedOut: Boolean, //sinaliza se saiu atrasado
            extraTime: String, //Tempo extra trabalhado
            faultHours: String, //Tempo não trabalhado
            workedHours: String //horas trabalhadas
        },
        turno2: {
            inTime: String, //hora de entrada
            outTime: String, // Hora de saida
            worked: Boolean, //Sinaliza se trabalhou
            isDelayedIn: Boolean, //sinaliza se entrou atrasado
            isDelayedOut: Boolean, //sinaliza se saiu atrasado
            extraTime: String, //Tempo extra trabalhado
            faultHours: String, //Tempo não trabalhado
            workedHours: String //horas trabalhadas
        },

    }]
})

/*Create a mongoose model*/
var employees = mongoose.model('employees', userSchema);

/*Express config*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); // get information from html forms
//use static files
app.use(express.static(path.join(__dirname, '/')));


/*Routes*/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getEmployees', function(req, res){
    employees.find({},function(err, data){
        if(err) console.lo
        res.send(data)
    })
})

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
