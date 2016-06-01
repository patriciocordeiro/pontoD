(function() {
    'use strict';

    angular.module('pontoDApp').controller('employeeCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', '$stateParams', '$state', employeeCtrl]);

    function employeeCtrl($scope, httpCallSrvc, $timeout, $mdDialog, $stateParams, $state) {

        var vm = this;
        var http = httpCallSrvc;

        //image root path
        vm.rootPath = '/assets/img/employees/';

        //get the id
        var id = $stateParams.id;
        //Send to server
        http.api.getByQuery({
            empId: id
        }, 'getEmployee', function(data) {

            vm.employeeData = data.res[0];
            console.log(vm.employeeData[0]);
        });

        //        vm.createEmployee = function(newEmployee) {
        //            console.log(newEmployee);
        //            var query = {};
        var query = {
            fullName: 'patricio',
            email:'pa@pa.com',
            password:'pa',
            birthDate:moment().format(),
            telefone:'9133471910',

        };
        http.api.getByQuery(
            query, 'signup', function(data) {
                console.log(data);
            });
        //        };
    }
})();
