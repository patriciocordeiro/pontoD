var pontoFunc = require('./ponto-methods');
//var mongoose = require('mongoose');
var waterfall = require("async-waterfall");

//Mine
var ponto = require('./ponto.models');
var moment = require('moment');
var pontoCode = require('./pontoStatusCodes');
var pontoConfig = require('./ponto.config');


var zeroTime = moment(moment.utc().startOf('day').hour(0).minute(0).second(0)).format();
var pontoSchema = function() {
    return {
        fullDate: '',
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



module.exports = {
    getOpenPonto: function(employeeData, callback) {
        var myPontoModel = new pontoSchema();
        var userData = {};
        console.log('ABRIR PONTO: Chegou do cliente', employeeData);
        waterfall([

                function(callback) {
                    //                    console.log(employeeData);
                    //get the user with the given Id
                    ponto.find({
                        empId: employeeData.empId
                    })
                        .select('fullName password working') //get only the password field
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
                                //                                console.log(user);
                                userData.fullName = user[0].fullName;
                                return callback(null, userData, pontoCode.error.alreadyWorking);
                            } else {
                                //open ponto
                                //-----------------------------------------------
                                //Get turno based on the received  time
                                pontoFunc.getTurno(employeeData.date, function(turno) {
                                    console.log('TURNO', turno);

                                    //                                    var turno = employeeData.turno  //APAGAR
                                    //                                    console.log('turnoturno', turno);
                                    //update the ponto object array
                                    myPontoModel[turno].inTime = employeeData.date || moment().format(); //virá do cliente
                                    //                                    console.log('CARACA', myPontoModel);
                                    console.log(pontoConfig.maxInTime[turno]);
                                    myPontoModel[turno].isDelayedIn = pontoFunc.getIsDelayd(employeeData.date, pontoConfig.maxInTime[turno]);
                                    myPontoModel.isActive = true;
                                    myPontoModel[turno].isOpened = true;
                                    myPontoModel.fullDate = employeeData.date;
                                    var dateObj = moment(employeeData.date);
                                    myPontoModel.date.year = dateObj.year();
                                    myPontoModel.date.month = dateObj.month();
                                    myPontoModel.date.weekDay = dateObj.weekday();
                                    myPontoModel.date.day = dateObj.date();

                                    //update the user  (set working to true)
                                    ponto.update({
                                        empId: employeeData.empId
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
                                            //                                            console.log(res);

                                            userData.fullName = user[0].fullName;
                                            userData.inTime = employeeData.date; //incluir hora de entrada e enviar para o user
                                            userData.isDelayedIn = myPontoModel[turno].isDelayedIn; //incluir hora de entrada e enviar para o user

                                            //                                            console.log('USER', userData);
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
        //        console.log('FECHAR PONTO: Chegou do cliente', employeeData);
        console.log('FECHAR PONTO');
        var userData = {};
        waterfall([

                function(callback) {
                    //                    console.log(employeeData);
                    //get the user with the given Id
                    ponto.find({
                        empId: employeeData.empId
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
                        ponto.aggregate({
                            $match: {
                                empId: employeeData.empId
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
                                //                                console.log('user from match', acTiveUser);
                                return callback(null, pontoCode.error.userNotWorking, user);
                            } else {
                                //                                console.log('AUI', acTiveUser);
                                callback(null, null, acTiveUser);
                            }
                        });
                    }
                },
                function(err, user, callback) {
                    //Check the password
                    //                    console.log('user', user);
                    if (!user) {
                        return callback(null, null, err);
                    } else if (!user[0].working) {
                        userData.fullName = user[0].fullName;
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
                                        //                                            pontoFunc.getTurno(moment().format(), function(turno) {
                                        //                                            USAR O DE CIMA (APENAS PARA TESTE)
                                        pontoFunc.getTurno(employeeData.date, function(turno) {
                                            console.log(turno);
                                            //                                                var turno = employeeData.turno //APAGAR
                                            var workedTime = pontoFunc.getWordkedTime(user[0].ponto[turno].inTime, employeeData.date, pontoConfig.minTimeToWork);
                                            //                                            console.log('workedTime', workedTime);
                                            callback(null, workedTime);
                                        });
                                    },
                                    function(workedTime, callback) {
                                        var pontoData = {};
                                        //                                        console.log('workedTime.duration', workedTime.duration.format());
                                        pontoData.outTime = employeeData.date;
                                        pontoData.workedTime = workedTime;
                                        pontoData.extraTime = pontoFunc.getExtraTime(workedTime.duration, pontoConfig.maxTimeToWork);
                                        pontoData.faultTime = pontoFunc.getFaultTime(workedTime.duration, pontoConfig.maxTimeToWork);
                                        callback(null, pontoData, user);
                                    },
                                    function(pontoData, user, callback) {
                                        //                                            console.log('myuser', user);
                                        //                                        console.log('PontoData', pontoData);
                                        pontoFunc.getTurno(moment().format(), function(turno) {
                                            //                                            console.log('TURNO', turno);
                                            //                                                var turno = employeeData.turno //APAGAR
                                            pontoFunc.getUpdatePonto(ponto, user, pontoData, turno, function(res) {
                                                //                                                console.log('resposta', res);
                                                if (res.nModified !== 1) {
                                                    return callback(null, null, pontoCode.error.userNotUpdated);
                                                } else {
                                                    userData.fullName = user[0].fullName;
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
                                    //                                    console.log('finally (middle)', status);
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
                //                console.log('final', res);
                callback(res);

            });
    },
    getOpenedPonto: function(callback) {
        ponto.aggregate({
            $match: {
                working: true
            }
        })
            .unwind("$ponto")
            .match({
                "ponto.isActive": true
            })
            .project({
                fullName: 1,
                imgPath: 1,
                departamento: 1,
                empId: 1,
                'ponto.turno1.inTime': 1,
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
