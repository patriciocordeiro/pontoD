(function() {
    'use strict';

    angular.module('pontoDApp').controller('relatorioCtrl', ['httpCallSrvc', 'reportSrvc', 'statisticsSrvc', 'employeeSrvc', '$filter', '$q', relatorioCtrl]);

    function relatorioCtrl(httpCallSrvc, reportSrvc, statisticsSrvc, employeeSrvc, $filter, $q) {
        var vm = this;
        vm.allEmployees = employeeSrvc.data;
        //Load statistics (load tabs)
        vm.statisticsTabs = statisticsSrvc.tabs;
        vm.rootPath = '/assets/img/employees/'; //root path for images
        vm.months = moment.months();
        vm.weekDays = reportSrvc.report.weekDays;
        vm.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        vm.currentYear = moment().year().toString(); //stores the current year
        vm.currentMonthName = vm.months[moment().month()]; //january
        vm.currentMonthNum = moment().month(); //january
        var monthIndex = vm.currentMonthNum; //pass current month number (0-11)
        vm.turno1 = {};
        vm.turno2 = {};
//        vm.employee = {
//            name: ''
//        };
        vm.selEmployeeData = {};
        vm.viewNoDataMsg = false


        /*Executed on page load*/
        //--------------------------------------------------------------------------------
        //Get all departments on page load
        reportSrvc.report.getDepartments(function(data) {
            vm.departments = data.values;
            console.log(vm);
        });

        //Execute this if report was fired in employee detail page
        if (reportSrvc.employeeId !== '' && reportSrvc.reportYear !== '') {
            var query = {
                empId: reportSrvc.employeeId,
                reportYear: reportSrvc.reportYear
            };
            vm.employee = {};
            vm.employee.reportYear = reportSrvc.reportYear;
            employeeSrvc.getOnePonto(query, function(data) {
                console.log('res data', data);
                //Check id there is an id or employee exists
                if (data.res.length>0) {
                    if (data.res[0]._id) {
                        console.log(data.res[0].pontos);
                        //pass returned data to vm
                        vm.selEmployeeData = data.res[0];
                        console.log('vm.selEmployeeData', vm.selEmployeeData);
                        filterByMonth(data.res[0].pontos, vm.currentMonthNum, function(data) {
                            console.log(data);
                            vm.employeePontoSingleMonth = data;
                            delaydTotals(data);
                        });
                        //load statistics on employee selection
                        getStatistics();
                        //create chart for the first property (first tab)
                        //            statisticsCreateChart(vm.statisticsTabs[0].total.value);
                        //show report area
                        vm.isViewReport = true;

                        //clear credentials
                        reportSrvc.employeeId = '';
                        reportSrvc.reportYear ='';

                    } else {
                        //hide the report area
                        vm.isViewReport = false;
                    }
                }else{
                    //no ponto data
                   // display no ponto msg
                    vm.isDataView = false;
                    vm.isViewReport = true;
                }

            });
        }

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
        vm.relatorioTabsTwoCols = reportSrvc.report.tabsTwoCols;
        vm.relatorioTabs = reportSrvc.report.tabs;
        console.log(reportSrvc.report.tabs);
        /*----------------------------------------------------------------------*/

        /*----------------------------------------------------------------------*/
        /*Tabs*/
        /*----------------------------------------------------------------------*/
        vm.isViewSelectEmployee = false; // show hide the selected employee div

        /*Funtion*/
        vm.getEmployeesBySector = function(query) {
            employeeSrvc.getBySector(query, function(data) {
                console.log(data);
                if (data.res.length>0) {
                vm.allEmployees = data.res;
                vm.isViewSelectEmployee = true;
                vm.employee.name = ''; //reset employee model
                }else{
                    vm.isViewSelectEmployee = false;
                    vm.viewNoDataMsg = !vm.isViewSelectEmployee;
                }
            });
        };
        //
        //        function getEmployeeBySector(query, callback) {
        //            employeeSrvc.getBySector(query, function(data) {
        //                callback(data.res);
        //            });
        //        }



        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        /*----------------Employee Selection-------------------------------------------------------------*/
        //Select a employee
        vm.isViewReport = false; //Verifica se um funcionaro foi selecionado e abre o resto das infos (tab e tal)
        vm.selectedEmployee = {
            //            name: ''
        }; // selected employee for the report (ng-model)


        /*Function*/
        vm.getSelectedEmployee = function(index) {
            vm.selEmployeeData = vm.allEmployees[index];
            console.log(vm.selEmployeeData);
            //Se for selecionado um colaborador
            if (vm.selEmployeeData._id.fullName) {

                //pass credentials to report service
                reportSrvc.employeeId = vm.selEmployeeData._id.empId;
                //sinalize para que as tabs sejam visualizadas
                vm.isViewReport = true;
                // reset monthIndex
                vm.currentMonthName = vm.months[moment().month()];
                //reset month index;
                monthIndex = vm.currentMonthNum;
                // reset: 'there is no data' view
                vm.isDataView = true;
            } else {
                //Esconda as tabs
                vm.isViewReport = false;
            }

            //            var startingMonth = "0"; //set firs month to show
            filterByMonth(vm.selEmployeeData.pontos, vm.currentMonthNum, function(data) {
                vm.employeePontoSingleMonth = data;
                //calculate totals
                delaydTotals(data);
            });
            //load statistics on employee selection
            //            getStatistics();
            //create chart for the first property (first tab)
            //            statisticsCreateChart(vm.statisticsTabs[0].total.value);
        };

        function resetVars() {

        }

        function filterByMonth(data, month, callback) {
            var filtData = $filter('filter')(data, {
                date: {
                    month: month
                }
            });
            callback(filtData);
        } /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

        vm.isListView = true;
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
            }
        };

        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        /*--------------------- Report entry-------------------------------------------*/
        //Handle report selection show/hide
        vm.reportEntry = {
            isShowYearSel: false
        };
        //Get report entry on selection
        var prevSector = '';
        vm.getReportEntry = function(entry, value) {
            vm.viewNoDataMsg = false; // no data message (turn off for every new selection)
            console.log(vm.employee);
            console.log('report entry', entry, value);
            if (entry === 'department') {
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
            var totalHora = 0;

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
                });

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
                totalDelaydIn = 0; //reinit
                totalAntiOut = 0;
                totalHora = 0;
                totalExtraHours = 0;
            }
        }

        /*---------------------------------------------------------------------------*/
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        /*Function*/
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

        vm.isDataView = true; // show/hide the relatorio data

        /*Function*/
        vm.getPontoPerMonth = function(action) {

            //Handle month change
            if (action === 'next') {
                if (monthIndex < 11) {
                    //increment month
                    monthIndex++;
                }
            } else if (action === 'prev') {
                if (monthIndex !== 0) {
                    //Decrement month
                    monthIndex--;
                }
            } else {
                //Selection of month directlly
                monthIndex = action;
            }

            //get the corresponding month name
            vm.currentMonthName = vm.months[monthIndex];
            //--------------------------------------

            //Filter to limit data to only one month
            filterByMonth(vm.selEmployeeData.pontos, monthIndex.toString(), function(data) {
                vm.employeePontoSingleMonth = data;
                if (data.length < 1) {
                    vm.isDataView = false; //Show there is no data to show
                } else {
                    vm.isDataView = true;
                }

                delaydTotals(data);
            });
            //            getStatistics();
        };

        /*Function*/
        vm.getPontoByYear = function(year) {
            console.log(year);
            var query = {
                empId: reportSrvc.employeeId,
                reportYear: year
            };
            console.log(query);
            //reset month
            vm.currentMonthName = vm.months[moment().month()];
            employeeSrvc.getOnePonto(query, function(data) {
                filterByMonth(data.res[0].pontos, vm.currentMonthNum, function(data) {
                    console.log('vm.currentMonthNum', vm.currentMonthName);
                    vm.employeePontoSingleMonth = data;
                });
                console.log(data);
            });
        };
        /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
        function delaydTotals(data) {
            //Calculate totals
            vm.turno1.totalDelayedIn = 0; //Total de entradas atrasadas
            vm.turno2.totalDelayedIn = 0; //Total de entradas atrasadas
            vm.turno1.totalAntiOut = 0; //Total de saídas antecipadas
            vm.turno2.totalAntiOut = 0; //Total de saídas antecipadas
            _(data).forEach(function(data) {
                console.log(data.turno1);
                if (data.turno1.isDelayedIn) {
                    vm.turno1.totalDelayedIn++;
                }
                if (data.turno2.isDelayedIn) {
                    vm.turno2.totalDelayedIn++;
                }
                if (data.turno1.isAntiOut) {
                    console.log(data.turno1.isAntiOut);
                    vm.turno1.totalAntiOut++;
                }
                if (data.turno2.isAntiOut) {
                    vm.turno2.totalAntiOut++;
                }
            });
        }
        var dateObj = moment('2016-06-11T11:26:26-03:00');
        console.log(dateObj.year())
        console.log(dateObj.month())
        console.log(dateObj.date())
        console.log(dateObj.weekday())
    }



})();
