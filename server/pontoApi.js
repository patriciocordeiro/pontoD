var ponto = require('./ponto-methods');
var mongoose = require('mongoose');
var waterfall = require("async-waterfall");

//Mine
var employee = require('./ponto.models')
var moment = require('moment');
var pontoCode = require('./pontoStatusCodes');
var pontoConfig = require('./ponto.config');


var zeroTime = moment(moment.utc().startOf('day').hour(0).minute(0).second(0)).format()
var pontoSchema = function() {
    return {
        fullDate: moment().format(),
        totalExtraTime: zeroTime,
        totalFaultTime: zeroTime,
        date: {
            year: '',
            month: ' ',
            weekDay: '',
            day: '',
        },

        turno1: {
            inTime: '', //hora de entrada
            outTime: '', // Hora de saida
            worked: false, //Sinaliza se trabalhou
            isDelayedIn: false, //sinaliza se entrou atrasado
            isDelayedOut: false, //sinaliza se saiu atrasado
            extraTime: zeroTime, //Tempo extra trabalhado
            faultTime: '', //Tempo não trabalhado
            workedTime: zeroTime //horas trabalhadas
        },
        turno2: {
            inTime: '', //hora de entrada
            outTime: '', // Hora de saida
            worked: false, //Sinaliza se trabalhou
            isDelayedIn: false, //sinaliza se entrou atrasado
            isDelayedOut: false, //sinaliza se saiu atrasado
            extraTime: zeroTime, //Tempo extra trabalhado
            faultTime: '', //Tempo não trabalhado
            workedTime: zeroTime //horas trabalhadas
        },
    };

};

var myPontoModel = new pontoSchema();

module.exports = {
    getOpenPonto: function(employeeData, callback) {
        console.log('ABRIR PONTO: Chegou do cliente', employeeData);
        waterfall([

                function(callback) {
                    console.log(employeeData);
                    //get the user with the given Id
                    employee.find({
                        id: employeeData.empId
                    })
                        .select('password working') //get only the password field
                    .exec(function(err, user) {
                        if (err) {
                            return callback(err);
                        }
                        if (!user[0]) {
                            //return the error
                            return callback(null, pontoCode.error.noUser);
                        } else {
                            //return the user
                            callback(null, user);
                        }
                    });
                },
                function(user, callback) {
                    //Check the password
                    if (!user[0]) {
                        return callback(null, pontoCode.error.noUser);
                    }
                    //If password exists
                    if (employeeData.password) {
                        console.log('Senha existe');
                        //if password match
                        if (user[0].password == employeeData.password) {
                            console.log('Senha é válida');
                            //-----------------------------------------------
                            //Check if ponto is already open
                            if (user[0].working) {
                                return callback(null, pontoCode.error.alreadyWorking);
                            } else {
                                //open ponto
                                //-----------------------------------------------
                                //Get turno based on the received  time
                                ponto.getTurno(employeeData.date, function(turno) {
                                    console.log('TURNO', turno);

                                    var turno = employeeData.turno //APAGAR
                                    console.log('turnoturno', turno);
                                    //update the ponto object array
                                    myPontoModel[turno].inTime = employeeData.date; //virá do cliente
//                                    console.log('CARACA', myPontoModel);
                                    myPontoModel[turno].isDelayedIn = ponto.getIsDelayd(employeeData.date, pontoConfig.maxInTimeInTurno1);
                                    myPontoModel.isActive = true;
                                    myPontoModel.isOpened = true;
                                    //update the user  (set working to true)
                                    employee.update({
                                        id: employeeData.empId
                                    }, {
                                        $set: {
                                            working: true, //set working to true

                                        },
                                        $push: {
                                            ponto: myPontoModel //push all myponto to a new field in the array ponto
                                        }
                                    }).exec(function(err, res) {
                                        if (err) {
                                            return callback(null, err);
                                        } else {
                                            console.log(res);
                                            callback(null, pontoCode.success.userUpdatedOk);
                                        }
                                    });
                                });
                            }
                        } else {
                            //Wrong password
                            return callback(null, pontoCode.error.wrongPassword);
                        }
                    } else {
                        //no password
                        return callback(null, pontoCode.error.noPassword);
                    }
                }
            ],
            function(err, result) {
                //finally
                callback(result);
            });
    },
    getClosePonto: function(employeeData, callback) {
        console.log('FECHAR PONTO: Chegou do cliente', employeeData);

        waterfall([

                function(callback) {
                    employee.aggregate({
                        $match: {
                            id: employeeData.empId
                        }
                    }, {
                        $unwind: "$ponto"
                    }, {
                        $match: {
                            'ponto.isActive': true
                        }
                    }).exec(function(err, user) {
                        if (err) {
                            return callback(null, err);
                        }
                        if (!user[0]) {
                            console.log('user from match', user);
                            return callback(null, pontoCode.error.noUser);
                        } else {
                            callback(null, user);
                        }
                    });
                },
                function(user, callback) {
                    //Check the password
                    if (!user[0]) {
                        return callback(null, pontoCode.error.noUser);
                    }
                    if (employeeData.password) {
                        console.log('Senha existe');
                        if (user[0].password === employeeData.password) {
                            console.log('Senha é válida');
                            //-----------------------------------------------
                            //Check if ponto was already open
                            user[0].working = true;
                            if (!user[0].working) {
                                return callback(null, pontoCode.error.userNotWorking);
                            } else {
                                //-----------------------------------------------
                                waterfall([

                                        function(callback) {
//                                            console.log(user[0]);
                                            //                                            ponto.getTurno(moment().format(), function(turno) {
                                            //                                            USAR O DE CIMA (APENAS PARA TESTE)
                                            ponto.getTurno(employeeData.date, function(turno) {
//                                                console.log(turno);

                                                var turno = employeeData.turno //APAGAR

                                                var workedTime = ponto.getWordkedTime(user[0].ponto[turno].inTime, employeeData.date, pontoConfig.minTimeToWork);

                                                callback(null, workedTime);
                                            });
                                        },
                                        function(workedTime, callback) {
                                            var pontoData = {};

                                            pontoData.outTime = employeeData.date;
                                            pontoData.workedTime = workedTime;
                                            pontoData.extraTime = ponto.getExtraTime(workedTime.duration, pontoConfig.maxTimeToWork);
                                            pontoData.faultTime = ponto.getFaultTime(workedTime.duration, pontoConfig.maxTimeToWork);
                                            callback(null, pontoData, user);
                                        },
                                        function(pontoData, user, callback) {
//                                            console.log('myuser', user);
//                                            console.log('PontoData', pontoData);
                                            ponto.getTurno(moment().format(), function(turno) {
                                                console.log('TURNO', turno);

                                                var turno = employeeData.turno //APAGAR

                                                ponto.getUpdatePonto(employee, user, pontoData, turno, function(res) {
                                                    console.log('resposta', res);
                                                    if (res.nModified !== 1) {
                                                        return callback(null, pontoCode.error.userNotUpdated);
                                                    } else {
                                                        return callback(null, pontoCode.success.userUpdatedOk);
                                                    }

                                                });

                                            });
                                        }
                                    ],
                                    //finally (middle)
                                    function(err, result) {
                                        console.log('finally (middle)', result);
                                        callback(null, result);
                                    });
                            }
                        } else {
                            //Wrong password
                            return callback(null, pontoCode.error.wrongPassword);
                        }
                    } else {
                        //No password
                        return callback(null, pontoCode.error.noPassword);
                    }
                }
            ],
            function(err, result) {
                //finally (end)
                console.log('final', result);
                callback(result);
            });
    },
    getOpenedPonto: function() {
        employee.aggregate({
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
            if (err) {
                console.log(err);
            } else {
                console.log('result', data);
            }

        });
    },


    //    employee.find({
    //        id: employeeData.empId
    //    }, function(err, user) {
    //        if (err)
    //            console.log(err)
    //        console.log('employee data', user);
    //        if (!user[0]) {
    //            console.log('user not found');
    //            res.json({
    //                res: 'noUser'
    //            });
    //        } else {
    //            if (employeeData.password) {
    //                if (user[0].password == employeeData.password) {
    //                    employee.update({
    //                        id: employeeData.empId
    //                    }, {
    //                        $set: {
    //                            working: employeeData.working
    //                        }
    //                    }, function(err, data) {
    //                        if (err)
    //                            console.log(err);
    //                        console.log(data);
    //
    //
    //                        if (data.ok === 1) {
    //                            if (data.nModified === 1) {
    //                                console.log('Ponto Aberto');
    //
    //                                if (employeeData.working === true) {
    //                                    /*Entrada*/
    //                                    employee.update({
    //                                        id: employeeData.empId
    //                                    }, {
    //                                        $push: {
    //                                            ponto: employeeData.ponto
    //                                        }
    //                                    }, function(err, data) {
    //                                        if (err) console.log(err);
    //                                        console.log(data);
    //
    //                                    })
    //                                } else if (employeeData.working === false) {
    //                                    //                                    console.log(obj);
    //                                    /*Saída*/
    //                                    employee.update({
    //                                        "ponto._id": ObjectId(user[0].ponto[0]._id)
    //                                    }, {
    //                                        $set: {
    //                                            "ponto.$.horaSaida": employeeData.ponto.horaSaida
    //                                        }
    //                                    }, function(err, data) {
    //                                        if (err) console.log(err);
    //                                        console.log(user[0].ponto[0]._id);
    //                                        console.log('Usúário saindo', data);
    //
    //                                    })
    //
    //                                }
    //
    //                            } else {
    //                                console.log('O ponto já foi aberto');
    //                            }
    //                        }
    //                        res.send(data[0]);
    //                    })
    //
    //                } else {
    //                    console.log('wrong password');
    //                    res.json({
    //                        res: 'wrongPass'
    //                    });
    //                }
    //            } else {
    //                console.log('NO password');
    //                res.json({
    //                    res: 'noPass'
    //                });
    //            }
    //        }
    //        //            }
    //    });
}
