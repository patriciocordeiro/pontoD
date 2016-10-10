(function() {
    'use strict';
    var User = require('./employees.model');
    var employee = require('./ponto.models');
    var passport = require('passport');
    var status = require('./pontoStatusCodes');

    //    console.log(user);
    module.exports = {
        all: function(req, res) {
            console.log('chegou do usuário');
            employee.find({}, function(err, data) {
                if (err) console.log(err);
                res.send(data);
            });
        },

        department: function(req, res) {
            console.log('department, chegou do usuário ', req.body);

            employee.aggregate({
                $match: {
                    department: req.body.department
                }
            })
                .unwind('$ponto')
                .match({
                    'ponto.date.year': req.body.reportYear
                })
                .group({
                    '_id': {
                        '_id': '$_id',
                        'fullName': '$fullName',
                        'empId': '$empId',
                        'department': '$department',
                        'imgPath': '$imgPath'
                    },
                    'pontos': {
                        $push: '$ponto'
                    }
                })
                .exec(function(err, data) {
                    if (err) console.log(err);
                    console.log(data);
                    res.json({
                        res: data
                    });
                });
        },

        one: function(req, res) {
            console.log('chegou do usuário', req.body);
            //        var query = req.body.empId;
            User.find({
                'empId': req.body.empId
            })
                .select('-_id -password')
                .exec(function(err, data) {
                    if (err) console.log(err);
                    console.log('hello', data);
                    res.json({
                        res: data
                    });
                });
        },

        onePonto: function(req, res) {
            console.log('onePonto, chegou do usuário', req.body);
            employee.aggregate({
                $match: {
                    empId: req.body.empId
                }
            })
                .unwind('$ponto')
                .match({
                    'ponto.date.year': req.body.reportYear
                })
                .group({
                    '_id': {
                        '_id': '$_id',
                        'fullName': '$fullName',
                        'empId': '$empId',
                        'department': '$department',
                        'imgPath': '$imgPath'
                    },
                    'pontos': {
                        $push: '$ponto'
                    }
                })
                .exec(function(err, data) {
                    if (err) console.log(err);
                    console.log(data);
                    res.json({
                        res: data
                    });
                });
        },


        signup: function(req, res, next) {
            passport.authenticate('local-signup', {
                session: false
            }, function(err, user, info) {
                if (err) {
                    res.json({
                        res: 'error'
                    });
                }
                if (info) {
                    res.json({
                        res: status.error.userNotSaved
                    });
                    console.log('user not saved');
                }
                if (user) {
                    res.json({
                        res: status.success.userSavedOk
                    });
                }
            })(req, res, next);
        }
    };
})();
