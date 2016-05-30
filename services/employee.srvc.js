(function() {
    'use strict';
    angular.module('pontoDApp').service('employeeSrvc', ['httpCallSrvc',

        function(httpCallSrvc) {
            var http = httpCallSrvc;
            //Get all employees
            //TODO GET employees by section
            var self = this;

            this.getAll = function(callback) {

                http.employee.getAll('getEmployees', function(data) {
                    return callback(data);
                });
            },

            this.getBySector = function(query, callback) {
                http.employee.ponto(query, 'getEmployeesBySector', function(data) {
                    return callback(data);
                });
            }

            //            this.getAll(function(data) {
            //                console.log(data);
            //                self.data = data;
            //            }),

            //            this.data = self.data
        }
    ]);

})();
