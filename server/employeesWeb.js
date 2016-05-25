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
        }
    };
})();
