(function() {
    'use strict';

    angular.module('pontoDApp').controller('employeeCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', '$stateParams', '$state', employeeCtrl]);

    function employeeCtrl($scope, httpCallSrvc, $timeout, $mdDialog, $stateParams, $state) {

        var vm = this;
        var http = httpCallSrvc;

        //get the id
        var id = $stateParams.id;
        //Send to server
        http.api.getByQuery({
            empId: id
        }, 'getEmployee', function(data) {

                vm.employeeData = data.res[0];
            console.log(vm.employeeData[0]);
        });
    }
})();
