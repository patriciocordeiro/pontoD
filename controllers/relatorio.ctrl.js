(function() {
    'use strict';

    angular.module('pontoDApp').controller('relatorioCtrl', ['httpCallSrvc', 'relatorioSrvc', 'statisticsSrvc', 'employeeSrvc', relatorioCtrl]);

    function relatorioCtrl(httpCallSrvc, relatorioSrvc, statisticsSrvc, employeeSrvc) {
        var vm = this;
        vm.allEmployees = employeeSrvc.data;
        //Load statistics (load tabs)
        vm.statisticsTabs = statisticsSrvc.tabs;
        console.log(vm.statisticsTabs);
        //Load http service
        var http = httpCallSrvc;
        var currentYear = moment().format('YYYY'); //stores the current year
        var currentMonth = moment().format('MM'); //stores the current month
        vm.months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agos', 'Set', 'Out', 'Nov', 'Dez'];
        vm.weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        vm.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        vm.currentYear = "2016"; //stores the current year
        vm.currentMonth = vm.months[0];
        /*charts.js*/
        vm.chartjs = {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                     'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                    ],

            //                    series: ['Series A', 'Series B'],
            data: [12, 20, 30]
        };
        console.log( vm.chartjs);

        /*Tabs*/
        //build relatório tabs
        vm.relatorioTabsTwoCols = relatorioSrvc.report.tabsTwoCols;
        vm.relatorioTabs = relatorioSrvc.report.tabs;
        console.log(relatorioSrvc.report.tabs);
        /*----------------Employee Selection-------------------------------------------------------------*/
        //Select a employee
        vm.isEmployeeSelected = false; //Verifica se um funcionaro foi selecionado e abre o resto das infos (tab e tal)
        vm.selectedEmployee = {
            //            name: ''
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
            //load statistics on employee selection
            getStatistics();
            //create chart for the first property (first tab)
//            statisticsCreateChart(vm.statisticsTabs[0].total.value);
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


        //        var statisticsTypeArray = []; //statistics array data for each type of statistics
        /*---------------------STATISTIC-------------------------------------------*/
        vm.statistics = {
            total: {
                delayedInPerMonth: [],
                antiOutPerMonth: [],
                workedHourPerMonth: [],
                extraHoursPerMonth: [],
            },
            mean: {
                delayedInPerMonth: 0,
                antiOutPerMonth: 0,
                workedHourPerMonth: 0,
                extraHoursPerMonth: 0,
            }

        };

        function getStatistics() {
            vm.statistics = {
                total: {
                    delayedInPerMonth: [],
                    antiOutPerMonth: [],
                    workedHourPerMonth: [],
                    extraHoursPerMonth: [],
                },
                mean: {
                    delayedInPerMonth: 0,
                    antiOutPerMonth: 0,
                    workedHourPerMonth: 0,
                    extraHoursPerMonth: 0,
                }

            };


            var currentYear = "2016";
            var currentMonth = "0";
            var totalDelaydIn = 0;
            var totalAntiOut = 0;
            var totalExtraHours = 0;
            var workedHoursPerMonth = 0;
            var totalHora = 0;
            var totalMin = 0;
            var totalSec = 0;
            var totalWorkedHourPerMonth = [];
            var totalDelaydInPerMonth = [];
            var totalAntiOutPerMonth = [];
            var totalExtraHoursPerMonth = [];

            vm.pontoSingleYearData = _.filter(vm.SelectedEmployeeData.ponto, {
                date: {
                    year: currentYear
                }
            });
            console.log(vm.pontoSingleYearData);
            //Iterare over months
            var maxMonth = 11;
            for (var month = 0; month <= maxMonth; month++) {
                currentMonth = month.toString();
                var singleMonthData = _.filter(vm.pontoSingleYearData, {
                    date: {
                        month: currentMonth
                    }
                }, function(data) {
                    console.log(data);
                    if (data == []) {
                        //force break
                        month = maxMonth;
                    }
                });
                //Iterate over days
                _.forEach(singleMonthData, function(data) {
                    /*Calculate entradas atrasadas*/
                    if (data.turno1.isDelayedIn || data.turno2.isDelayedIn) {
                        totalDelaydIn++;
                    }
                    /*Saídas antecipadas*/
                    if (data.turno1.isAntiOut || data.turno2.isAntiOut) {
                        totalAntiOut++;
                    }
                    /*Hora extra*/
                    if (data.isExtraTime) {
                        totalExtraHours++;
                    }
                    totalHora = totalHora + Math.round(moment.duration(data.totalWorkedTime).asHours())
                    //                    console.log('totalHora', totalHora);
                })

                //Total
                vm.statistics.total.delayedInPerMonth.push(totalDelaydIn);
                vm.statistics.total.antiOutPerMonth.push(totalAntiOut);
                vm.statistics.total.workedHourPerMonth.push(totalHora);
                vm.statistics.total.extraHoursPerMonth.push(totalExtraHours);
                //Mean
                vm.statistics.mean.delayedInPerMonth = _.mean(vm.statistics.total.delayedInPerMonth);
                vm.statistics.mean.antiOutPerMonth = _.mean(vm.statistics.total.antiOutPerMonth);
                vm.statistics.mean.workedHourPerMonth = _.mean(vm.statistics.total.workedHourPerMonth);
                vm.statistics.mean.extraHoursPerMonth = _.mean(vm.statistics.total.extraHoursPerMonth);

                //Initialize the chart on load
                //                vm.chartjs.data.push(vm.statistics.total)
                //                chartsMonthStatistics(vm.statistics);
                totalDelaydIn = 0; //reinit
                totalAntiOut = 0;
                totalHora = 0;
                totalExtraHours = 0;
            }
        }

        /*---------------------------------------------------------------------------*/

        function statisticsCreateChart(value) {
            console.log(value);
            //pass  mean values
            console.log('statisticsCreateChart');
            vm.chartjs.mean = vm.statistics.mean[value];
            //pass total values to chart data

            vm.chartjs.data = [(vm.statistics.total[value])];
            console.log(vm.chartjs);
        };

        vm.createChart = function(value) {
            statisticsCreateChart(value);
        }

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

            getStatistics();
        }


    }


})();
