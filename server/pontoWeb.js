(function() {
    /*pontoWeb.js*/
    'use strict';
    var pontoApi = require('./pontoApi');
    module.exports = {
        openPontoWeb: function(req, res) {
            pontoApi.getOpenPonto(req.body, function(data) {
                console.log(data);
                res.json({
                    res: data
                });
            });
        },
        closePontoWeb: function(req, res) {
            pontoApi.getClosePonto(req.body, function(data) {
                res.json({
                    res: data
                });
            });

        },

        openedPontoWeb: function(req, res) {
            pontoApi.getOpenedPonto(function(data) {
                res.send(
                    data
                );
            });
        },
    };
})();
