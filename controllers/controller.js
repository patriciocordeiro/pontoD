(function() {
    'use strict';

    angular.module('pontoDApp').controller('Ctrl', ['$resource', Ctrl]);


    function Ctrl($resource) {
        var vm = this
        vm.employeeOpenPonto = {};

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
        }]

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
        vm.getOpenPonto = function(query, acao, callback) {
            var httpCall = new httpResource();
            httpCall.get({
                acao: acao,
            }, query, function(data) {
                return callback(data);
            })
        }

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
            days: [1, 2,3,4, 5, 6,7, 8, 9,10,-1,12,13,14,15,16,17,18,19,20,21,22,-1,24,25,26,27,-1,29,30, 31]
        }

        /*Calendário------------------------------------------------------------------*/
        //Calendar object
        vm.calendar = {}
        vm.calendar.weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sab'];
        vm.calendar.dayCssClass =[];
        //Defaults (Starting year and month)
        var defaultYear = 2016;
        var defaultMonth = 0 //january

        var prevYear = 2015;
        var prevMonth = 11 //december
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

                if(employeeWorkTrue.days[i]!==-1){
                    console.log(i);
                    console.log(employeeWorkTrue.days[i]);
                    vm.calendar.dayCssClass.push('work-is-true');
                }else{
                    vm.calendar.dayCssClass.push('work-is-false');

                }
            }
            console.log(vm.calendar.days);


        }
        /*--------------------------------------------------------------------------------------------------------------*/



    }
})();