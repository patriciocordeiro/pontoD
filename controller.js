(function () {
    'use strict';

    angular.module('pontoDApp').controller('Ctrl', ['$resource', Ctrl]);


    function Ctrl($resource) {
        var vm = this
        vm.employeeOpenPonto = {};

        console.log('Starting the Controller');

        vm.navbarItems = [{
            item: 'Home',
            urls: 'app.home'
        }, {
            item: 'Bater ponto',
            url: 'app.ponto'
        }, {
            item: 'Pontos abertos',
            url: 'app.openPonto'
        }, {
            item: 'Pontos fechados',
            url: ''
        }, {
            item: 'Relatórios',
            url: 'app.relatorios'
        }]

        //get index of clicked menu index
        vm.isActive = false; //set the active mennu button
        vm.getIndex = function (index) {
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
        console.log(httpResource);
        vm.getOpenPonto = function (query, acao, callback) {
            var httpCall = new httpResource();
            httpCall.get({
                acao: acao,
            }, query, function (data) {
                return callback(data);
            })
        }

        /*Get opened ponto*/
        var query = {};
        vm.lastPontoIdx = 0; //last entry for ponto
        vm.getOpenPonto(query, 'getOpenPonto', function (data) {
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


        var common = function (query, acao, callback) {
            var httpCall = new httpResource();
            httpCall.save({
                acao: acao,
            }, query, function (data) {
                return callback(data);
            })
        }

        vm.openClosePonto = function (employee) {
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
            common(query, 'openClosePonto', function (data) {
                console.log(data);

                //                vm.employeeOpenPonto = data
            })
        }

        //        vm.getOpenOrClosePonto = function(isWorking){
        //
        //        }

        /*Calendário*/
        vm.calendar = [{
            weekDays: ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sab']
        }, {
            months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        }]

        var totalDaysinMonth = new Date(2016, 5, 0).getDate();
        var temp = new Date('2016, january, 1');
        vm.monthDays = [];
        var myDate = {}
        var mydatesArray = []
        for (var i = 1; i <= totalDaysinMonth; i++) {
            vm.monthDays.push(i)

            var n = temp.setUTCDate(i);
            //            console.log(n)
            var d = new Date(n)
            var dateString = d.toDateString().split(' ')
                //            console.log(d.toDateString().split(' '));

            myDate.days = dateString[2];
            myDate.weekDay = dateString[0]
            mydatesArray.push(myDate)
                //            console.log(mydatesArray);
            myDate = {}
        }

        vm.calendarData = (_.groupBy(mydatesArray, 'weekDay'))
        var myDays = [];
        var calendarObject = {};
        vm.All = []
        _.forEach(vm.calendarData, function (data) {
            console.log('hello', data);
            _.forEach(data, function (days) {
                myDays.push(days.days);
                console.log('myDays', myDays)

            })
            calendarObject.weekDay = data[0].weekDay;
            calendarObject.days = myDays;
            myDays = [];
            console.log(calendarObject);
            vm.All.push(calendarObject)
            calendarObject = {}
                //                .log(_.groupBy(data, 'weekDay'));
        })
        console.log(vm.All);

        vm.myTemp = [{
            weekDay: 'Seg',
            days: ['1', '7', '14', '18']
        }, {
            weekDay: 'Ter',
            days: ['2', '8', '15', '19']
        }]

    }
})();