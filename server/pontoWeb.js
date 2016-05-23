/*pontoWeb.js*/
'use strict'
var pontoApi = require('./pontoApi')
module.exports = {
    openPontoWeb: function(req, res) {
        pontoApi.getOpenPonto(req.body)
    },
    closePontoWeb: function(req, res) {
        pontoApi.getClosePonto(req.body)

    },

    openedPontoWeb: function(req, res) {
        pontoApi.getOpenedPonto()
    },

}
