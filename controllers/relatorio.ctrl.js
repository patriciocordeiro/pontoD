(function() {
    'use strict';

    angular.module('pontoDApp').controller('relatorioCtrl', ['httpCallSrvc', 'relatorioSrvc', 'statisticsSrvc', 'employeeSrvc', '$filter', '$q', relatorioCtrl]);

    function relatorioCtrl(httpCallSrvc, relatorioSrvc, statisticsSrvc, employeeSrvc, $filter, $q) {
        var vm = this;
        vm.allEmployees = employeeSrvc.data;
        //Load statistics (load tabs)
        vm.statisticsTabs = statisticsSrvc.tabs;
        //root path for images
        vm.rootPath = '/assets/img/employees/';
        //Load http service
        var http = httpCallSrvc;
        var currentYear = moment().format('YYYY'); //stores the current year
        var currentMonth = moment().format('MM'); //stores the current month
        vm.months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        vm.weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
        vm.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        vm.departamentos = ['Engenharia', 'Planejamento', 'Administrativo', 'Pedagógico',
            'Jurídico'
        ];
        vm.currentYear = "2016"; //stores the current year
        vm.currentMonth = vm.months[0];
        /*----------------------------------------------------------------------*/
        /*charts.js*/
        /*----------------------------------------------------------------------*/
        vm.chartjs = {
            labels: ['Janeiro', 'Fevereiro', 'Mar~co', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            //                    series: ['Series A', 'Series B'],
            data: [12, 20, 30]
        };
        /*----------------------------------------------------------------------*/
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

        /*----------------------------------------------------------------------*/
        /*Tabs*/
        /*----------------------------------------------------------------------*/
        //build relatório tabs
        vm.relatorioTabsTwoCols = relatorioSrvc.report.tabsTwoCols;
        vm.relatorioTabs = relatorioSrvc.report.tabs;
        console.log(relatorioSrvc.report.tabs);
        /*----------------------------------------------------------------------*/

        /*----------------------------------------------------------------------*/
        /*Tabs*/
        /*----------------------------------------------------------------------*/
        vm.isViewSelectEmployee = false; // show hide the selected employee div
        vm.getEmployeesBySector = function(query) {
            employeeSrvc.getBySector(query, function(data) {
                vm.allEmployees = data.res;
                console.log(data);
                vm.isViewSelectEmployee = true;
            });
        };

        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        /*----------------Employee Selection-------------------------------------------------------------*/
        //Select a employee
        vm.isViewReport = false; //Verifica se um funcionaro foi selecionado e abre o resto das infos (tab e tal)
        vm.selectedEmployee = {
            //            name: ''
        }; // selected employee for the report (ng-model)
        vm.getSelectedEmployee = function(index) {
            vm.selEmployeeData = vm.allEmployees[index];
            console.log(vm.selEmployeeData);
            //Se for selecionado um colaborador
            if (vm.selEmployeeData._id.name) {
                //sinalize para que as tabs sejam visualizadas
                vm.isViewReport = true;
            } else {
                //Esconda as tabs
                vm.isViewReport = false;
            }
            //            vm.selEmployeePonto = vm.selEmployeeData.ponto;
            //            console.log(vm.selEmployeePonto);

            //            var test = _.filter(vm.selEmployeeData, {
            //
            //                date: {
            //
            //                    month: defaultMonth.toString()
            //                }
            //
            //            });


            //                                        console.log(test);
            var startingMonth = "0"; //set firs month to show
            filterByMonth(vm.selEmployeeData.pontos, startingMonth, function(data) {
                console.log(data);
                vm.employeePontoSingleMonth = data;
            })
            console.log(vm.employeePontoSingleMonth);
            //load statistics on employee selection
            getStatistics();
            //create chart for the first property (first tab)
            //            statisticsCreateChart(vm.statisticsTabs[0].total.value);
        };

        function filterByMonth(data, month, callback) {
            var filtData = $filter('filter')(data, {
                date: {
                    month: month
                }
            });
            callback(filtData);
        } /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

        vm.isListView = true;
        //        vm.viewIconicon = 'view_comfy';
        //        vm.buttonClass = 'md-primary';
        //        vm.tooltip = 'Ver como Calendário'
        vm.viewMode = {
            icon: 'view_list',
            buttonClass: 'md-primary',
            tooltip: 'Ver como Lista',
        };
        vm.toggleView = function() {
            vm.isListView = !vm.isListView;
            if (vm.isListView) {
                vm.viewMode = {
                    icon: 'view_list',
                    buttonClass: 'md-primary',
                    tooltip: 'Ver como Lista',
                };
            } else {

                vm.viewMode = {
                    icon: 'view_comfy',
                    buttonClass: 'md-accent',
                    tooltip: 'Ver como Calendário',
                };
                //                vm.viewIconicon = 'view_comfy';
                //                vm.buttonClass = 'md-primary'
                //                vm.tooltip = 'Ver como Calendário';
            }
        };

        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        /*--------------------- Report entry-------------------------------------------*/

        //Handle report selection show/hide
        vm.reportEntry = {
            isShowYearSel: false
        };
        //Get report entry on selection
        var prevSector ='';
        vm.getReportEntry = function(entry, value) {
            console.log(vm.employee);
            console.log('report entry', entry,value);
            if (entry === 'sector') {
                vm.reportEntry.isShowYearSel = true;
                if (prevSector !== value) {
                    vm.isViewSelectEmployee = false;
                }
            }
            prevSector = value;
        };
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

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
            var totalDelayedInPerMonth = [];
            var totalAntiOutPerMonth = [];
            var totalExtraHoursPerMonth = [];

            vm.pontoSingleYearData = _.filter(vm.selEmployeeData.ponto, {
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
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        function statisticsCreateChart(value) {
            //pass  mean values
            vm.chartjs.mean = vm.statistics.mean[value];
            //pass total values to chart data
            vm.chartjs.data = [(vm.statistics.total[value])];
        }

        vm.createChart = function(value) {
            statisticsCreateChart(value);
        };


        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        /*----------------get ponto by month-------------------------------------------------------------*/

        var monthIndex = 0; //janeiro
        //        var prevMonth = 11; //december

        vm.currentMonth = vm.months[0]; // 'Jan'; //stores the current month
        vm.isDataView = true; // show/hide the relatorio data
        vm.getPontoPerMonth = function(action) {
            if (action === 'next') {
                if (monthIndex < 11) {
                    monthIndex++;
                }
            } else if (action === 'prev') {
                if (monthIndex !== 0) {
                    monthIndex--;
                }
            } else {
                //Selection of month directlly
                //                console.log(action);
                monthIndex = action;
                //                console.log('nennhum dos dois');
            }

            vm.currentMonth = vm.months[monthIndex];
            //
            //            vm.employeePontoSingleMonth = _.filter(vm.selEmployeePonto, {
            //                date: {
            //                    month: startMonthindex.toString()
            //                }
            //            });

            filterByMonth(vm.selEmployeeData.pontos, monthIndex.toString(), function(data) {
                console.log(data);
                vm.employeePontoSingleMonth = data;
                if (data.length < 1) {
                    vm.isDataView = false;
                } else {
                    vm.isDataView = true;
                }

                //Calculate totals
                vm.turno1TotalDelayedIn = 0 //Total de entradas atrasadas
                vm.turno2TotalDelayedIn = 0 //Total de entradas atrasadas
                vm.turno1TotalDelayedOut = 0 //Total de saídas antecipadas
                vm.turno2TotalDelayedOut = 0 //Total de saídas antecipadas
                _(data).forEach(function(data) {
                    if (data.turno1.isDelayedIn) {
                        vm.turno1TotalDelayedIn++;
                    }
                    if (data.turno2.isDelayedIn) {
                        vm.turno2TotalDelayedIn++;
                    }
                    if (data.turno1.isDelayedOut) {
                        vm.turno1TotalDelayedOut++;
                    }
                    if (data.turno2.isDelayedOut) {
                        vm.turno2TotalDelayedOut++;
                    }
                });

            });


            //            console.log(vm.SelectedEmployeeFiltData);


            //            console.log(vm.SelectedEmployeeFiltData);

            getStatistics();
        };
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/


    }


})();
