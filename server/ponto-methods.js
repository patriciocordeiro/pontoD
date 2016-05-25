//ponto-methods.js
'use strict';
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;


module.exports = {

    //no momento do login do primeiro turno
    getTurno: function(date, callback) {
        //check if the date is valid
        console.log(date);
        var turno;
        //get hour only the hour
        var hours = moment.utc(date).format('H');
        console.log(hours);
        if (hours >= 0 && hours <= 11) {
            turno = 'turno1';
        } else if (hours >= 12 && hours <= 23) {
            turno = 'turno2';

        }
        return callback(turno);

    },

    getDateValidation: function(date) {
        //This function checks if the ponto Date is same as today
        var isValidDate = false;
        //get today date
        var today = moment().format();
        //compare with the user sent date
        isValidDate = moment(date).isSame(today, 'day');
        return isValidDate;
    },

    getIsDelayd: function(currTime, maxTime) {
        //currTime: user sent time
        //maxTime: defined maxTime to compare with
        //create a date object with today date and maxTime

        var maxTimeDate = moment.utc().startOf('day').hour(maxTime.hour).minute(maxTime.min).second(maxTime.sec);
        //compare the two times
        var isDelayd = moment(currTime).isAfter(maxTimeDate);
        console.log('isDelayd:', isDelayd);
        return isDelayd;
    },

    getWordkedTime: function(inTime, outTime, minTimeTowork) {
        //        console.log('getWordkedTime', inTime);
        //        console.log('getWordkedTime', outTime);

        var inTimeDate = moment(inTime);
        var outTimeDate = moment(outTime);
        var workedTime = {};

        var temp = moment.utc(moment(outTimeDate.diff(inTimeDate)));

        //create a date with current date and time
        workedTime.duration = moment.utc().startOf('day').hour(temp.hours()).minutes(temp.minutes()).seconds(temp.seconds()); //No fault time

        if (workedTime.duration.hour() < minTimeTowork) {
            workedTime.worked = false;
        } else {
            workedTime.worked = true;
        }

        workedTime.duration = workedTime.duration.format();

        console.log(workedTime);
        return workedTime;

    },

    getFaultTime: function(workedTime, expedientTime) {
        var faultTime = {};
        faultTime.duration = moment(moment.utc().startOf('day').hour(0).minute(0).second(0)).format(); //No fault time
        var expedientTimeObj = moment.utc().startOf('day').hour(expedientTime.hour).minute(expedientTime.min).second(expedientTime.sec)
        var workedTimeObj = moment(workedTime);
        faultTime.state = moment(workedTimeObj).isBefore(expedientTimeObj);

        if (faultTime.state) {
            var duration = moment.duration(expedientTimeObj.diff(workedTimeObj)); //get the diference bettween the two times
            //            console.log(duration);
            faultTime.duration = moment(moment.utc().startOf('day').hour(duration.hours()).minutes(duration.minutes()).seconds(duration.seconds())).format();
        }
        //        faultTime.duration = faultTime.duration.format();
        return faultTime;
    },
    getExtraTime: function(workedTime, expedientTime) {
        var extraTime = {};
        extraTime.duration = moment.utc().startOf('day').hour(0).minute(0).second(0); //No extra time

        var maxTimeToWork = moment.utc().startOf('day').hour(4).minute(0).second(0)
        var workedTime = moment.utc().startOf('day').hour(3).minute(0).second(40)

        extraTime.state = moment(workedTime).isAfter(maxTimeToWork);

        if (extraTime.state) {
            var duration = moment.duration(workedTime.diff(maxTimeToWork)); //get the diference bettween the two times
            extraTime.duration = moment.utc().startOf('day').hour(duration.hours()).minutes(duration.minutes()).seconds(duration.seconds());
        }
        extraTime.duration = extraTime.duration.format();
        console.log(extraTime);
        return extraTime;
    },

    getUpdatePonto: function(model, user, pontoData, turno, callback) {
        var currUser = user[0];
        console.log(user[0].id);
        if (turno === 'turno1') {
            model.update({
                "ponto._id": ObjectId(user[0].ponto._id)
            }, {
                $set: {
                    'ponto.$.turno1.workedHours': pontoData.workedTime.duration,
                    'ponto.$.turno1.faultTime': pontoData.faultTime.duration,
                    'ponto.$.turno1.extraTime': pontoData.extraTime.duration,
                    'ponto.$.turno1.outTime': pontoData.outTime,
                    'ponto.$.turno1.isDelayedOut': pontoData.extraTime.state,
                    'ponto.$.turno1.worked': pontoData.workedTime.state,
                    'ponto.$.turno1.isAntiOut': pontoData.faultTime.state, //fechou o ponto
                    'ponto.$.turno1.isClosed': true, //fechou o ponto
                    'ponto.$.isActive': false,
                },

            }).exec(function(err, res) {
                if (err) {
                    return callback(null, err);
                } else {
                    model.update({

                        id: currUser.id
                    }, {
                        $set: {
                            'working': false
                        }

                    }).exec(function(err, res) {
                        if (err) {
                            return callback(null, err);
                        } else {
                            return callback(res);
                        }
                    });
                }
            });
        } else if (turno === 'turno2') {
            model.update({
                "ponto._id": new ObjectId(currUser.ponto._id)
            }, {
                $set: {
                    'ponto.$.turno2.workedHours': pontoData.workedTime.duration,
                    'ponto.$.turno2.faultTime': pontoData.faultTime.duration,
                    'ponto.$.turno2.extraTime': pontoData.extraTime.duration,
                    'ponto.$.turno2.outTime': moment.utc().format(),
                    'ponto.$.turno2.isDelayedOut': pontoData.extraTime.state,
                    'ponto.$.turno2.worked': pontoData.workedTime.state,
                    'ponto.$.turno2.isAntiOut': pontoData.faultTime.state, //fechou o ponto
                    'ponto.$.turno2.isClosed': true, //fechou o ponto
                    'ponto.$.isActive': false,
                },

            }).exec(function(err, res) {
                if (err) {
                    return callback(null, err);
                } else {
                    model.update({

                        id: currUser.id
                    }, {
                        $set: {
                            'working': false
                        }

                    }).exec(function(err, res) {
                        if (err) {
                            return callback(null, err);
                        } else {
                            return callback(res);
                        }


                    });

                }
            });
        }

    }
};
