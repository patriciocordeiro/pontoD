(function() {
    'use strict';

    angular.module('pontoDApp').controller('pontoCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', pontoCtrl]);

    function pontoCtrl($scope, httpCallSrvc, $timeout, $mdDialog) {
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
            http.employee.ponto(query, employee.action, function(resData) {
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
        http.employee.getAll('openedPonto', function(resData) {
            console.log(resData);
            vm.activeEmployees = resData;
        })
        /*--------------------------------------------*/

        //APENAS PARA TESTES APAGAR QUANDO TIVER NO BANCO DE DADOS
        //Imagens
        vm.rootPath = '/assets/img/employees/';
        vm.imgPath = ['employee4.png', 'employee2.png', 'employee3.png'];

        vm.employeeData = {
            'Nome completo': 'Patricio Cordeiro',
            'Idade': '34 anos',
            'Estado civil':'Casado',
            'Endereço': 'Rodovia augusto Montemegro',
            'Ramal': '3347-2739',
            'Formação': 'Engenharia Elétrica',
            'Nível acadêmico': 'Mestrado',
            'Departamento': 'Engenharia',
            'Cargo/Função': 'Designer de projetos',
            'Data do contrato': '20 de Dezembro de 2009',
        };
    }

})();
