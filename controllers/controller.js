(function() {
    'use strict';

    angular.module('pontoDApp').controller('Ctrl', ['$resource', Ctrl]);


    function Ctrl($resource) {
        var vm = this
        vm.employeeOpenPonto = {};

        //Defaults (Starting year and month)
        var defaultYear = 2016;
        var defaultMonth = 0 //january
        var statisticsTypeArray = []; //statistics array data for each type of statistics
        vm.currentMonth = 'Jan'; //stores the current month
        vm.currentYear = defaultYear; //stores the current year

        var prevYear = 2015;
        var prevMonth = 11 //december

        console.log('Starting the Controller');

        vm.navbarItems = [{
            item: 'Home',
            url: 'app.home'
        }, {
            item: 'Bater ponto',
            url: 'app.ponto'
        }, {
            item: 'Pontos abertos',
            url: 'app.openPonto'
        }, {
            item: 'Pontos fechados',
            url: 'app.openPonto'
        }, {
            item: 'Relatórios',
            url: 'app.relatorios'
        }, {
            item: 'Estatísticas',
            url: 'app.estatisticas'
        }]


        //Setor de trabalho
        vm.employee = {
            setor: ''
        } //salva o setor selecionado
        vm.setor = ['Administraçao', 'Pedagógica', 'Recursos', 'Humanos', 'Pedagógico', ]
        //Array dos meses do ano
        vm.calendar = {
            month: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agos', 'Set', 'Out', 'Nov', 'Dez'],
            weekDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
        }


        vm.report = {}

        vm.report.tab = [{
            label: 'Assiduidade',
            title: 'Relatório de assiduidade',
            turno: [{
                index: 'turno1',
                title: 'Primeiro Turno (manhã)',
                subtitle1: 'Total de entradas atrasadas',
                subtitle2: 'Total de saídas antecipadas',
                cols: [{
                    title: 'Entrada atrasada ',
                    property: 'isDelaydIn',
                    value: 'inTime'
                }, {
                    title: 'Saída antecipada',
                    property: 'isAntiOut',
                    value: 'outTime'


                }, ]

            }, {
                index: 'turno2',
                title: 'Segundo Turno (Tarde)',
                subtitle1: 'Total de entradas atrasadas',
                subtitle2: 'Total de saídas antecipadas',
                cols: [{
                    title: 'Entrada atrasada',
                    property: 'isDelaydIn',
                    value: 'inTime'
                }, {
                    title: 'Saída antecipada',
                    property: 'isAntiOut',
                    value: 'outTime'

                }, ]

            }]

        }]

        vm.report.towColPropetyTab = [{
                label: 'Horas trabalhadas',
                title: 'Relatório de horas trabalhadas',
                isdataOnCalendar: true,
                isIcon: false, //Se vai usar icon no calendario
                icon: '',
                isTooltip: true,
                toolTipText: 'Total de horas trabalhadas',
                cols: [{
                    index: 1,
                    header: 'Data'
                }, {
                    index: 2,
                    header: 'Horas trabalhadas',
                    property: 'isWorked',
                    value: 'totalWorkedHours',


                }]
            }, {
                label: 'Hora extra',
                title: 'Relatório de horas extras',
                isdataOnCalendar: false,
                isIcon: true, //Se vai usar icon no calendario
                icon: 'add_alarm',
                isTooltip: true,
                toolTipText: 'Total de horas extras',
                cols: [{
                    index: 1,
                    header: 'Data'
                }, {
                    index: 2,
                    header: 'Horas Extras',
                    property: 'isExtraHours',
                    value: 'totalExtraHours',



                }]
            }, {
                label: 'Horas não trabalhadas',
                title: 'Relatório de horas não trabalhadas',
                isdataOnCalendar: true,
                isIcon: false, //Se vai usar icon no calendario
                icon: '',
                isTooltip: true,
                toolTipText: 'Total de horas não trabalhadas',
                cols: [{
                    index: 1,
                    header: 'Data'
                }, {
                    index: 2,
                    header: 'Horas não trabalhadas',
                    property: 'isfaultTime',
                    value: 'totalfaultTime'
                }]
            }, {
                label: 'Faltas',
                title: 'Relatório de faltas',
                isdataOnCalendar: true,
                isIcon: false, //Se vai usar icon no calendario
                icon: '',
                isTooltip: false,
                toolTipText: '',
                cols: [{
                    index: 1,
                    header: ''
                }, {
                    index: 2,
                    header: 'Dias não trabalhadas',
                    property: 'isWorked',
                    value: ''
                }]
            }

        ]



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
                vm.tooltip = 'Ver como Calendário'
            }
        }

        //get index of clicked menu index
        vm.isActive = false; //set the active mennu button
        vm.getIndex = function(index) {
            console.log(index);
            return vm.isActive = index
        }
        /*Http Resource*/
        function httpResource() {
            return $resource('http://localhost:3000/:acao/:employee/:id', {
                employee: '@employee',
                id: '@id',
                acao: '@acao'
            }, {
                'get': {
                    method: 'GET',
                    isArray: true
                },
                'save': {
                    method: 'POST',
                    isArray: false
                }
            })
        }
        /*-----------------------------------------------------------------------------*/
        vm.isEmployeeSelected = false; //Verifica se um funcionaro foi selecionado e abre o resto das infos (tab e tal)
        vm.selectedEmployee = {
            name: ''
        } // selected emplyee for the report (ng-model)
        vm.getSelectedEmployee = function(index) {
            vm.SelectedEmployeeData = vm.allEmployees[index]
            console.log(typeof vm.SelectedEmployeeData.ponto[0].totalWorkedHours);
            var d = new Date(vm.SelectedEmployeeData.ponto[0].totalWorkedHours)
            console.log(d.getTime());
            //Se for selecionado um colaborador
            console.log(vm.SelectedEmployeeData.name);
            if (vm.SelectedEmployeeData.name) {
                //                sinalize para que as tabs sejam visualizadas
                vm.isEmployeeSelected = true;
            } else {
                vm.isEmployeeSelected = false;
            }
        }
        /*---------------------------------------------------------------------------*/
        vm.getPontoPerMonth = function(action) {
            if (action == 'next') {
                prevMonth++
                defaultMonth++
            } else if (action == 'prev') {
                prevMonth--
                defaultMonth--
            }

            //get a date  in Ms for the first day of the current month
            var d = new Date(defaultYear, defaultMonth, 0)
            var dateString = d.toDateString().split(' ');

            console.log(dateString);
            vm.currentMonth = dateString[1]; //stores the current month
            vm.currentYear = dateString[3]; //stores the current year
            var currentMonthInNum = d.getMonth().toString() //Current month as Number (0-11)
            console.log('currentMonthInNum', typeof currentMonthInNum);
            //            console.log(_.flattenDeep(vm.SelectedEmployeeData.ponto));
            vm.SelectedEmployeeFiltData = _.filter(vm.SelectedEmployeeData.ponto, {
                //                'year': "2016",
                date: {
                    month: currentMonthInNum
                }
                //                'date.month': "0"
            });



            vm.turno1TotalDelayedIn = 0 //Total de entradas atrasadas
            vm.turno2TotalDelayedIn = 0 //Total de entradas atrasadas
            vm.turno1TotalDelayedOut = 0 //Total de saídas antecipadas
            vm.turno2TotalDelayedOut = 0 //Total de saídas antecipadas
            _(vm.SelectedEmployeeFiltData).forEach(function(data) {
                if (data.turno1.isDelaydIn) {
                    vm.turno1TotalDelayedIn++
                }
                if (data.turno2.isDelaydIn) {
                    vm.turno2TotalDelayedIn++
                }
                if (data.turno1.isDelaydOut) {
                    vm.turno1TotalDelayedOut++
                }
                if (data.turno2.isDelaydOut) {
                    vm.turno2TotalDelayedOut++
                }
            })
            console.log(vm.SelectedEmployeeFiltData);

            getStatistics();
        }
        /*---------------------------------------------------------------------------*/
        vm.getAll = function(acao, callback) {
            var httpCall = new httpResource();
            httpCall.get({
                acao: acao
            }, function(data) {
                return callback(data)
            })
        }
        /*---------------------------------------------------------------------------*/
        vm.getOpenPonto = function(query, acao, callback) {
            var httpCall = new httpResource();
            httpCall.get({
                acao: acao,
            }, query, function(data) {
                return callback(data);
            })
        }
        /*---------------------------------------------------------------------------*/

        //Get all employees
        vm.getAll('getEmployees', function(data) {
            vm.allEmployees = data
            console.log(vm.allEmployees);
        })
        /*---------------------------------------------------------------------------*/
        /*Get opened ponto*/
        var query = {};
        vm.lastPontoIdx = 0; //last entry for ponto
        vm.getOpenPonto(query, 'getOpenPonto', function(data) {
            console.log(data);
            vm.employeeOpenPonto = data;
            var time = data[0].ponto.horaEntrada
            var ts = time.split(':');
            var timeInSec = Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]);
            console.log(timeInSec);
            var d = new Date()
            var timeNowInMs = Date.now();

            console.log(timeNowInMs);

            var difInMs = timeNowInMs - 1462159126047;
            var sec = difInMs / (1000);
            var min = Math.floor(sec / 60)
            var hour = Math.floor(min / 60)
            console.log(sec / 60);
            console.log(min);
            console.log(hour);
            var myDate = new Date()
            vm.timeOnWork = Date.UTC(1970, 0, 1, difInMs)
            console.log(vm.timeOnWork);
        })
        /*---------------------------------------------------------------------------*/


        var common = function(query, acao, callback) {
            var httpCall = new httpResource();
            httpCall.save({
                acao: acao,
            }, query, function(data) {
                return callback(data);
            })
        }
        /*---------------------------------------------------------------------------*/
        vm.openClosePonto = function(employee) {
            var query = {};
            var d = new Date();
            var hour = d.toTimeString().split(' ')[0];

            console.log('Horas', hour);
            query = employee;

            //            convert number to string
            query.empId = query.empId.toString();
            query.ponto = {};
            query.ponto.day = d.getDate().toString();
            query.ponto.year = d.getFullYear().toString();
            query.ponto.month = d.getMonth().toString();
            if (employee.working == true) {
                query.ponto.turnoEntrada = 'manhã';
                query.ponto.horaEntrada = hour;
                query.ponto.turnoSaida = '';
                query.ponto.horaSaida = '';
            } else if (employee.working == false) {
                query.ponto.turnoSaida = 'tarde';
                query.ponto.horaSaida = hour;
            }

            //            find the User ObjectId
            vm.employeeOpenPonto
            query.objectId =
            //            query.working = true;
            console.log('My query', query);
            common(query, 'openClosePonto', function(data) {
                console.log(data);

                //                vm.employeeOpenPonto = data
            })
        }

        //        vm.getOpenOrClosePonto = function(isWorking){
        //
        //        }

        var employeeWorkTrue = {
            month: 'january',
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, -1, 24, 25, 26, 27, -1, 29, 30, 31]
        }

        /*Calendário------------------------------------------------------------------*/
        //Calendar object
        //        vm.calendar = {}
        //        vm.calendar.weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sab'];
        vm.calendar.dayCssClass = [];

        vm.changeMonth = function(action) {
            if (action == 'next') {
                prevMonth++
                defaultMonth++
            } else {
                prevMonth--
                defaultMonth--
            }
            console.log('prevYear', prevYear);
            console.log('defaultYear', defaultYear);
            console.log('defaultMonth', defaultMonth);
            //Get total days of the previous month
            var totalDaysinPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
            console.log('totalDaysinPrevMonth', totalDaysinPrevMonth);
            //Get total days of the current month
            var totalDaysinCurrMonth = new Date(defaultYear, defaultMonth, 0).getDate();
            console.log('totalDaysinCurrMonth', totalDaysinCurrMonth);

            //get a date  in Ms for the first day of the current month
            var dateInMs = new Date(defaultYear, defaultMonth, 0).setUTCDate(1);

            //create a date object with the date in ms
            var d = new Date(dateInMs)

            //Get the weekday as a number (0-6)
            var weekDayNumber = d.getDay();
            //Case weekDayNumber is 0 (sunday)
            if (weekDayNumber == 0) {
                //go to the next week (sunday)
                weekDayNumber = 7;
            }
            //Convert the date object to string and split in an array
            var dateString = d.toDateString().split(' ')

            vm.calendar.currentMonth = dateString[1]; //stores the current month
            vm.calendar.currentYear = dateString[3]; //stores the current year
            vm.calendar.days = []; //store the days of the current month

            var j = totalDaysinPrevMonth - weekDayNumber + 1;
            var k = 1;

            for (var i = 0; i < 42; i++) {
                if (i < weekDayNumber) {
                    vm.calendar.days.push(j);
                    j++

                } else if (i >= weekDayNumber && i < totalDaysinCurrMonth + weekDayNumber) {
                    vm.calendar.days.push(i - weekDayNumber + 1);
                } else {
                    vm.calendar.days.push(k);
                    k++
                }

                if (employeeWorkTrue.days[i] !== -1) {
                    console.log(i);
                    console.log(employeeWorkTrue.days[i]);
                    vm.calendar.dayCssClass.push('work-is-true');
                } else {
                    vm.calendar.dayCssClass.push('work-is-false');

                }
            }
            console.log(vm.calendar.days);


        }
        /*--------------------------------------------------------------------------------------------------------------*/
        /*Relatorios*/
        //1462653588952
        vm.relatorios = ['Dias trabalhados', 'Horas trabalhadas', 'Horas extras', 'Dias não trabalhadas', 'Horas não trabalhadas']

        var Mydate = new Date(1970, 0, 1);
        console.log(Mydate.getTime());
        var today = new Date().getTime();
        console.log(today);

        var diff = 1462654059142 - 1462653588952 + 10800000
        var diffHours = new Date(diff);
        var HourString = diffHours.toTimeString()
        console.log('diff', diff);

        //        convert timeString to Date object
        console.log(new Date(1970, 0, 1, '00', '07', '50').getTime());
        console.log(new Date(diff).getTime());


        /*-------------------------------------------------------------------------*/
        function getStatistics() {
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
            var totalAntiOutPerMonth = []
            var totalExtraHoursPerMonth = []

            vm.pontoSingleYearData = _.filter(vm.SelectedEmployeeData.ponto, {
                date: {
                    year: currentYear
                }
            });
            console.log(vm.pontoSingleYearData);

            //Iterare over months
            var maxMonth = 11
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
                    if (data.turno1.isDelayIn || data.turno2.isDelaydIn) {
                        totalDelaydIn++
                    }
                    /*Saídas antecipadas*/
                    if (data.turno1.isAntiOut || data.turno2.isAntiOut) {
                        totalAntiOut++;
                    }
                    /*Hora extra*/
                    if (data.isExtraHours) {
                        totalExtraHours++;
                    }



                    totalHora = totalHora + Math.round(moment.duration(data.totalWorkedHours).asHours())

                    console.log('totalHora', totalHora);
                })


                totalDelaydInPerMonth.push(totalDelaydIn);
                totalAntiOutPerMonth.push(totalAntiOut);
                totalWorkedHourPerMonth.push(totalHora);
                totalExtraHoursPerMonth.push(totalExtraHours);

                vm.statisticsTabs = [{
                    label: 'Horas Trabalhadas',
                    data: totalWorkedHourPerMonth,
                    mean: {
                        title: "Média de horas trabalhadas por mês",
                        data: _.mean(totalWorkedHourPerMonth)
                    }
                }, {
                    label: 'Entradas atrasadas',
                    data: totalDelaydInPerMonth,
                    mean: {
                        title: "Média entradas atrasadas por mês",
                        data: _.mean(totalDelaydInPerMonth)
                    }
                }, {
                    label: 'Saídas antecipadas',
                    data: totalAntiOutPerMonth,
                    mean: {
                        title: "Média de saídas antecipadas por mês",
                        data: _.mean(totalAntiOutPerMonth)
                    }
                }, {
                    label: 'Horas extras',
                    data: totalExtraHoursPerMonth,
                    mean: {
                        title: "Média de horas extras por mês",
                        data: _.mean(totalExtraHoursPerMonth)
                    }
                }]
                //Initialize the chart on load
                chartsMonthStatistics(vm.statisticsTabs[0].data)
                //                chartsMonthStatistics(vm.meanWorkedHourPerDay);

                //                console.log(vm.delaydOutArray);
                //                console.log(vm.meanWorkedHourPerDay);


                totalDelaydIn = 0; //reinit
                totalAntiOut = 0;
                totalHora = 0;
                totalExtraHours = 0;
            }
            /*Charts*/
            /*---------------------------------------------------------------------------*/
            vm.highchartsNG = {
                options: {
                    chart: {

                        type: 'column'
                    }
                },
                xAxis: {
                    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Número de atrasos'
                    }
                },
                series: [{
                    data: vm.delaydOutArray
                }],
                title: {
                    text: 'Total de atrasos por mês'
                },
                loading: false
            }


        }
        /*---------------------------------------------------------------------------*/
        var statistics = {
            meanWorkedHours: function() {},
            meanDelaydin: function() {},
            meanDelaydOut: function() {},
        }

        vm.statisticsCreateChart = function(index) {
            console.log(vm.statisticsTabs[index || 0]);
            //            vm.functionArray[index]();
            chartsMonthStatistics(vm.statisticsTabs[index].data)
            console.log(statisticsTypeArray);
            //            temp()
            //            console.log(temp);
        }


        vm.functionArray = [statistics.meanWorkedHours, statistics.meanDelaydin]
        /*charts.js*/
        function chartsMonthStatistics(data) {
            console.log('CHART-DATA', data);
            vm.chartjs = {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                ],

                series: ['Series A', 'Series B'],
                data: [

                    data,
                ]
            }
            //            vm.labels =
            //                vm.series =
            //                vm.data = [
            //                    data,
            //            ];
            //            //            vm.onClick = function(points, evt) {
            //                console.log(points, evt);
            //            };
            //            console.log(vm.data);

        }
        //        vm.meanDelaydInPerday.push(totalDelaydInPerMonth);
        //        vm.totalAntiOutPerMonth.push(totalAntiOutPerMonth)
        //        vm.meanWorkedHourPerDay.push(meanWorkedHour);
        //        statisticsTypeArray = [vm.meanDelaydInPerday, vm.totalAntiOutPerMonth, vm.meanWorkedHourPerDay]
        console.log(moment().format('00:00:00'))

    }
})();
