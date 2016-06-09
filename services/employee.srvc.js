(function() {
    'use strict';
    angular.module('pontoDApp').service('employeeSrvc', ['httpCallSrvc',

        function(httpCallSrvc) {
            var http = httpCallSrvc;
            //Get all employees
            //TODO GET employees by section
            var self = this;

            this.getAll = function(callback) {

                http.api.getAll('getEmployees', function(data) {
                    return callback(data);
                });
            },

            this.getBySector = function(query, callback) {
                http.api.getByQuery(query, 'getEmployeesBydepartment', function(data) {
                    return callback(data);
                });
            },
            this.getOne = function(query, callback) {
                http.api.getByQuery(query, 'getEmployee', function(data) {
                    return callback(data);
                });
            },
            this.getOnePonto = function(query, callback) {
                http.api.getByQuery(query, 'getOnePonto', function(data) {
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
