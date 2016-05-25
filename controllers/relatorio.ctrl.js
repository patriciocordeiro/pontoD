(function() {
    'use strict';

    angular.module('pontoDApp').controller('relatorioCtrl', ['httpCallSrvc', 'relatorioSrvc', relatorioCtrl]);

    function relatorioCtrl(httpCallSrvc, relatorioSrvc) {
        var vm = this;
        console.log(vm);
        var http = httpCallSrvc;
        var currentYear = moment().format('YYYY'); //stores the current year
        var currentMonth = moment().format('MM'); //stores the current month
        vm.months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agos', 'Set', 'Out', 'Nov', 'Dez'];
        vm.weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        vm.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        vm.currentYear = "2016"; //stores the current year

        //Get all employees
        //TODO GET employees by section
        //        vm.getAll = function() {
        http.employee.getAll('getEmployees', function(resData) {
            console.log(resData);
            vm.allEmployees = resData;
        });


        /*Tabs*/
        //build relatório tabs
        vm.relatorioTabsTwoCols = relatorioSrvc.report.tabsTwoCols;
        vm.relatorioTabs = relatorioSrvc.report.tabs;
        console.log(relatorioSrvc.report.tabs);
        /*----------------Employee Selection-------------------------------------------------------------*/
        //Select a employee
        vm.isEmployeeSelected = false; //Verifica se um funcionaro foi selecionado e abre o resto das infos (tab e tal)
        vm.selectedEmployee = {
            name: ''
        }; // selected emplyee for the report (ng-model)
        vm.getSelectedEmployee = function(index) {
            vm.SelectedEmployeeData = vm.allEmployees[index];
            //Se for selecionado um colaborador
            if (vm.SelectedEmployeeData.name) {
                //sinalize para que as tabs sejam visualizadas
                vm.isEmployeeSelected = true;
            } else {
                //Esconda as tabs
                vm.isEmployeeSelected = false;
            }
            vm.selEmployeePonto = vm.SelectedEmployeeData.ponto;
            //            console.log(vm.selEmployeePonto);

            vm.SelectedEmployeeFiltData = _.filter(vm.selEmployeePonto, {

                date: {
                    year: "2016",
                    month: defaultMonth.toString()
                }
            });
        };
        /*---------------------------------------------------------------------------*/

        vm.isListView = true;
        vm.viewIconicon = 'view_comfy';
        vm.buttonClass = 'md-primary';
        vm.tooltip = 'Ver como Calendário'
        vm.toggleView = function() {
            vm.isListView = !vm.isListView
            if (vm.isListView == false) {
                vm.viewIconicon = 'view_list';
                vm.buttonClass = 'md-accent'
                vm.tooltip = 'Ver como Lista'
            } else {

                vm.viewIconicon = 'view_comfy';
                vm.buttonClass = 'md-primary'
                vm.tooltip = 'Ver como Calendário';
            }
        };


        /*---------------------------------------------------------------------------*/
        var defaultYear = 2016;
        var defaultMonth = 0; //janua
        var prevYear = 2015;
        var prevMonth = 11; //december

        vm.currentMonth = vm.months[0] // 'Jan'; //stores the current month
        vm.getPontoPerMonth = function(action) {
            if (action === 'next') {
                prevMonth++;
                defaultMonth++;
            } else if (action === 'prev') {
                prevMonth--;
                defaultMonth--;
            }
            vm.currentMonth = vm.months[defaultMonth];
            console.log(defaultMonth.toString());
            vm.SelectedEmployeeFiltData = _.filter(vm.selEmployeePonto, {

                date: {
                    year: vm.currentYear.toString,
                    month: defaultMonth.toString()
                }
            });
            console.log(vm.SelectedEmployeeFiltData);

            vm.turno1TotalDelayedIn = 0 //Total de entradas atrasadas
            vm.turno2TotalDelayedIn = 0 //Total de entradas atrasadas
            vm.turno1TotalDelayedOut = 0 //Total de saídas antecipadas
            vm.turno2TotalDelayedOut = 0 //Total de saídas antecipadas
            _(vm.SelectedEmployeeFiltData).forEach(function(data) {
                if (data.turno1.isDelayedIn) {
                    vm.turno1TotalDelayedIn++
                }
                if (data.turno2.isDelayedIn) {
                    vm.turno2TotalDelayedIn++
                }
                if (data.turno1.isDelayedOut) {
                    vm.turno1TotalDelayedOut++
                }
                if (data.turno2.isDelayedOut) {
                    vm.turno2TotalDelayedOut++
                }
            })
            //            console.log(vm.SelectedEmployeeFiltData);

            //            getStatistics();
        }
    }
})();
