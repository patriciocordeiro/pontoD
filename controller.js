(function() {
    'use strict';

    angular.module('pontoDApp').controller('Ctrl', ['$resource', Ctrl]);


    function Ctrl($resource) {
        var vm = this
        vm.employeeOpenPonto = {};

        console.log('Starting the Controller');


        /*Http Resource*/
        function httpResource() {
            return $resource('http://192.168.0.11:3000/:acao/:employee/:id', {
                employee: '@employee',
                id: '@id',
                acao: '@acao'
            }, {
                'get': {
                    method: 'GET',
                    isArray: true
                },
                'save': {
                    method: 'POST',
                    isArray: false
                }
            })
        }
        /*-----------------------------------------------------------------------------*/
        console.log(httpResource);
        vm.getOpenPonto = function(query, acao, callback) {
            var httpCall = new httpResource();
//            console.log(httpCall);
            httpCall.get({
                acao: acao,
                //                employee: employee,
                //                id: id

            }, query, function(data) {
                return callback(data);
            })
        }

        var query = {};
        vm.getOpenPonto(query, 'getOpenPonto', function(data) {
            console.log(data);
            vm.employeeOpenPonto = data
        })

    }
})();
