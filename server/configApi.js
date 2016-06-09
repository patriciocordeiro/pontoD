(function() {
    'use strict';
    var config = require('./generalConfig.model');
    module.exports = {
        getformFields: function(req, res) {
            config.find({}, function(err, data) {
                if (err) console.log(err);
                res.send(data);
            });
        },

        insertNewIputFields: function(req, res) {
            console.log(req.body);
            //checa se  já não existe
            var array = req.body.newInputFields;
            config.findOneAndUpdate({
                    _id: req.body._id
                }, {
                    $pushAll: {
                        'values': array
                    },
                }, {
                    new: true,
                },
                function(err, data) {
                    if (err) console.log(error);
                    console.log(data);
                    res.send(data);
                });

        },
        getDepartments :function(req, res){
            config.find({'name':req.body.name}, function(err, data) {
                if (err) console.log(err);
                console.log('getDepartments',data);
                res.send(data[0]);
            });
        }
    };
})();
