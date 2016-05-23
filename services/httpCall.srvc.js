angular.module('pontoDApp').service('httCallSrvc', ['httpResSrvc',

    function(httpResSrvc) {

        /*---------------------------------------------------------------------------*/

        this.employee = {
            getAll: function(acao, callback) {
                //                var httpCall = new httpResource();
                httpResSrvc.ponto.get({
                    acao: acao
                }, function(data) {
                    return callback(data)
                })
            },

            ponto: function(query, acao, callback) {
                //                var httpCall = new httpResource();
                httpResSrvc.ponto.save({
                    acao: acao,
                }, query, function(data) {
                    return callback(data);
                })
            }
            //            /*---------------------------------------------------------------------------*/
            //           ponto: function(query, acao, callback) {
            ////                var httpCall = new httpResource();
            //               httpResSrvc.ponto.get({
            //                    acao: acao,
            //                }, query, function(data) {
            //                    return callback(data);
            //                })
            //            }

        }
        /*---------------------------------------------------------------------------*/

    }
]);
