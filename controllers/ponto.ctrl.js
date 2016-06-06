(function() {
    'use strict';

    angular.module('pontoDApp').controller('pontoCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', '$stateParams', '$state', '$mdMedia', pontoCtrl]);

    function pontoCtrl($scope, httpCallSrvc, $timeout, $mdDialog, $stateParams, $state, $mdMedia) {
        var vm = this;
        var http = httpCallSrvc;
        console.log('Controller de ponto iniciado');
        var now = moment().toISOString();
        //get the screen size for responsiveness
        $scope.$mdMedia = $mdMedia;
        //root path for images
        vm.rootPath = '/assets/img/employees/';
        /*--------------------------------------------*/
        /*Open close ponto*/
        /*--------------------------------------------*/
        vm.getPontoOpenClose = function(employee, event) {
            var query = {};
            query = employee;
            query.empId = query.empId.toString();
            query.date = moment().format(); //get nou time
            http.api.getByQuery(query, employee.action, function(resp) {
                //Reset ponto form---------------
                vm.baterPontoForm.$setPristine();
                vm.baterPontoForm.$setUntouched();
                vm.baterPontoForm.$setDirty(false);
                vm.employee = '';
                //---------------------------------------------
                //Ponto Answer dialog
                $mdDialog.show({
                    targetEvent: event,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    controller: 'DialogCtrl as vm',
                    templateUrl: '/views/ponto.diag.html',
                    locals: {
                        data: {
                            message: resp.res,
                            diag: 'ponto'
                        }
                    }
                });
            });
        };
        /*--------------------------------------------*/

        /*--------------------------------------------*/
        /*Opened ponto*/
        http.api.getAll('openedPonto', function(resData) {
            console.log(resData);
            vm.activeEmployees = resData;
        })
        /*--------------------------------------------*/



    }

})();
