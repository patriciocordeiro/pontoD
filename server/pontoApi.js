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
        var userData = {};
        console.log('ABRIR PONTO: Chegou do cliente', employeeData);
        waterfall([

                function(callback) {
                    console.log(employeeData);
                    //get the user with the given Id
                    employee.find({
                        id: employeeData.empId
                    })
                        .select('name password working') //get only the password field
                    .exec(function(err, user) {
                        if (err) {
                            return callback(err);
                        }
                        if (!user[0]) {
                            //return the error
                            return callback(null, pontoCode.error.noUser, null);
                        } else {
                            //return the user
                            callback(null, null, user);
                        }
                    });
                },
                function(err, user, callback) {
                    //Check the password
                    console.log('user', user);
                    if (!user) {
                        return callback(null, null, pontoCode.error.noUser);
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
                                userData.name = user[0].name;
                                return callback(null, userData, pontoCode.error.alreadyWorking);
                            } else {
                                //open ponto
                                //-----------------------------------------------
                                //Get turno based on the received  time
                                ponto.getTurno(employeeData.date, function(turno) {
                                    console.log('TURNO', turno);

                                    //                                    var turno = employeeData.turno  //APAGAR
                                    console.log('turnoturno', turno);
                                    //update the ponto object array
                                    myPontoModel[turno].inTime = employeeData.date || moment().format(); //virá do cliente
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

                                            userData.name = user[0].name;
                                            userData.inTime = employeeData.date; //incluir hora de entrada e enviar para o user
                                            userData.isDelayedIn = myPontoModel[turno].isDelayedIn; //incluir hora de entrada e enviar para o user

                                            console.log('USER', userData);
                                            callback(null, userData, pontoCode.success.userUpdatedOk);
                                        }
                                    });
                                });
                            }
                        } else {
                            //Wrong password
                            return callback(null, null, pontoCode.error.wrongPassword);
                        }
                    } else {
                        //no password
                        return callback(null, null, pontoCode.error.noPassword);
                    }
                }
            ],
            function(err, user, status) {
                //finally
                var res = {};
                res.user = user;
                res.status = status;
                res.type = 'entrada';
                callback(res);
            });
    },
    getClosePonto: function(employeeData, callback) {
        console.log('FECHAR PONTO: Chegou do cliente', employeeData);
        var userData = {};
        waterfall([

                function(callback) {
                    console.log(employeeData);
                    //get the user with the given Id
                    employee.find({
                        id: employeeData.empId
                    })
                        .select('name password working') //get only the password field
                    .exec(function(err, user) {
                        if (err) {
                            return callback(err);
                        }
                        if (!user[0]) {
                            //return the error
                            return callback(null, pontoCode.error.noUser, null);
                        } else {
                            //return the user
                            callback(null, null, user);
                        }
                    });
                },
                function(err, user, callback) {
                    if (!user) {
                        return callback(null, pontoCode.error.noUser, null);
                    } else {
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
                        }).exec(function(err, acTiveUser) {
                            if (err) {
                                return callback(null, err);
                            }
                            if (!acTiveUser[0]) {
                                console.log('user from match', acTiveUser);
                                return callback(null, pontoCode.error.userNotWorking, user);
                            } else {
                                console.log('AUI', acTiveUser);
                                callback(null, null, acTiveUser);
                            }
                        });
                    }
                },
                function(err, user, callback) {
                    //Check the password
                    console.log('user', user);
                    if (!user) {
                        return callback(null, null, err);
                    } else if (!user[0].working) {
                        userData.name = user[0].name;
                        return callback(null, userData, err);

                    }
                    if (employeeData.password) {
                        console.log('Senha existe');
                        if (user[0].password === employeeData.password) {
                            console.log('Senha é válida');
                            //-----------------------------------------------
                            //Check if ponto was already closed
                            //                            user[0].working = true;
                            //                            if (!user[0].working) {
                            //                                return callback(null, user[0].name, pontoCode.error.userNotWorking);
                            //                            } else {
                            //-----------------------------------------------
                            waterfall([

                                    function(callback) {
                                        //                                            console.log(user[0]);
                                        //                                            ponto.getTurno(moment().format(), function(turno) {
                                        //                                            USAR O DE CIMA (APENAS PARA TESTE)
                                        ponto.getTurno(employeeData.date, function(turno) {
                                            //                                                console.log(turno);

                                            //                                                var turno = employeeData.turno //APAGAR

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

                                            //                                                var turno = employeeData.turno //APAGAR

                                            ponto.getUpdatePonto(employee, user, pontoData, turno, function(res) {
                                                console.log('resposta', res);
                                                if (res.nModified !== 1) {
                                                    return callback(null, null, pontoCode.error.userNotUpdated);
                                                } else {
                                                    userData.name = user[0].name;
                                                    userData.outTime = pontoData.outTime;
                                                    userData.faultTime = pontoData.faultTime;
                                                    userData.workedTime = pontoData.workedTime;

                                                    return callback(null, userData, pontoCode.success.userUpdatedOk);
                                                }

                                            });

                                        });
                                    }
                                ],
                                //finally (middle)
                                function(err, user, status) {
                                    console.log('finally (middle)', status);
                                    callback(null, user, status);
                                });
                        } else {
                            //Wrong password
                            return callback(null, null, pontoCode.error.wrongPassword);
                        }
                    } else {
                        //No password
                        return callback(null, null, pontoCode.error.noPassword);
                    }
                }
            ],
            function(err, user, status) {
                //finally (end)
                var res = {};
                res.user = user;
                res.status = status;
                res.type = 'saida';
                console.log('final', res);
                callback(res);

            });
    },
    getOpenedPonto: function(callback) {
        employee.aggregate({
            $match: {
                working: true
            }
        })
            .unwind("$ponto")
            .match({
                "ponto.isActive": true
            })
            .project({
                name: 1,
                setor: 1,
                id: 1, 'ponto.turno1.inTime': 1,
                'ponto.turno2.inTime': 1
            })
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    console.log('result', data);
                    callback(data);
                }

            });
    },
};
