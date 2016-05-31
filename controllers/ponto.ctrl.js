(function() {
    'use strict';

    angular.module('pontoDApp').controller('pontoCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', '$stateParams', '$state', pontoCtrl]);

    function pontoCtrl($scope, httpCallSrvc, $timeout, $mdDialog, $stateParams, $state) {
        var vm = this;
        var http = httpCallSrvc;
        console.log('Controller de ponto iniciado');
        var now = moment().toISOString();

        /*--------------------------------------------*/
        /*Open close ponto*/
        /*--------------------------------------------*/
        vm.getPontoOpenClose = function(employee) {
            var query = {};
            query = employee;
            query.empId = query.empId.toString();
            query.date = moment().format(); //get nou time
            http.api.getByQuery(query, employee.action, function(resData) {
                //Reset ponto form---------------
                vm.baterPontoForm.$setPristine();
                vm.baterPontoForm.$setUntouched();
                vm.baterPontoForm.$setDirty(false);
                vm.employee = '';
                //---------------------------------------------
                //Ponto Answer dialog
                var ev;
                $mdDialog.show({
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    controller: 'DialogCtrl as vm',
                    templateUrl: '/views/ponto.diag.html',
                    locals: {
                        message: resData.res
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
        $scope.id = '';
        $scope.id = $stateParams._id;

        //        vm.getEmployee = function(){
        vm.datatata;
        vm.getEmployee = function(id) {
            console.log(id);
            http.api.getByQuery({
                empId: '100'
            }, 'getEmployee', function(data) {


                console.log(vm.employeeData);
                if (data) {
                    console.log(data);
                    $timeout(function() {
                        vm.employeeData = [1,2,3,4]
                        $state.go('app.employee')
                    }, 1000)


                }
                console.log($stateParams);
                //                ui-sref="app.employee({id: activeEmployee._id})"

            });
        };
        //        $scope.$watch('id', function(oldValue, newValue) {
        //            if (newValue !== oldValue) {
        //                console.log('O valor mudou');
        //            }
        //        })
        //        }
        //APENAS PARA TESTES APAGAR QUANDO TIVER NO BANCO DE DADOS
        //Imagens
//        vm.rootPath = '/assets/img/employees/';
//        vm.imgPath = ['employee4.png', 'employee2.png', 'employee3.png'];

        //        vm.employeeData = {
        //            'Nome completo': 'Patricio Cordeiro',
        //            'Idade': '34 anos',
        //            'Estado civil': 'Casado',
        //            'Endereço': 'Rodovia augusto Montemegro',
        //            'Ramal': '3347-2739',
        //            'Formação': 'Engenharia Elétrica',
        //            'Nível acadêmico': 'Mestrado',
        //            'Departamento': 'Engenharia',
        //            'Cargo/Função': 'Designer de projetos',
        //            'Data do contrato': '20 de Dezembro de 2009',
        //        };
    }

})();
