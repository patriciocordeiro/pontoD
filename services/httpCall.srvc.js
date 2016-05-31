angular.module('pontoDApp').service('httpCallSrvc', ['httpResSrvc',

    function(httpResSrvc) {

        /*---------------------------------------------------------------------------*/

        this.api = {
            getAll: function(acao, callback) {
                //                var httpCall = new httpResource();
                httpResSrvc.resource.get({
                    acao: acao
                }, function(data) {
                    return callback(data);
                });
            },

            getByQuery: function(query, acao, callback) {
                //                var httpCall = new httpResource();
                httpResSrvc.resource.save({
                    acao: acao,
                }, query, function(data) {
                    return callback(data);
                });
            },


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
