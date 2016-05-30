(function() {
    'use strict';
    var employees = require('./ponto.models');
    module.exports = {
        all: function(req, res) {
            console.log('chegou do usuário');
            employees.find({}, function(err, data) {
                if (err) console.log(err);
                res.send(data);
            });
        },

        sector: function(req, res) {
            console.log('chegou do usuário', req.body);

            employees.aggregate({
                $match: {
                    setor: req.body.setor
                }
            })
                .unwind('$ponto')
                .match({
                    'ponto.date.year': req.body.reportYear
                })
                .group({
                    '_id': {
                        '_id': '$_id',
                        'name': '$name',
                        'setor': '$setor'
                    },
                    'pontos': {
                        $push: '$ponto'
                    }
                })
                .exec(function(err, data) {
                    if (err) console.log(err);
                    //                    console.log(data);
                    res.json({
                        res: data
                    });
                });
        },

        one: function(req, res) {
            console.log('chegou do usuário');
            employees.find({
                req.body._id
            }, function(err, data) {
                if (err) console.log(err);
                res.send(data);
            });
        },
    };
})();
