(function() {
    'use strict';

    angular.module('pontoDApp').controller('pontoCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', pontoCtrl]);

    function pontoCtrl($scope, httpCallSrvc, $timeout, $mdDialog) {
        var vm = this;
        var http = httpCallSrvc;
        console.log('Controller de ponto iniciado');
        var now = moment().toISOString();

        vm.getPontoOpenClose = function(employee) {
            console.log(employee);
            var query = {};
            query = employee;
            //convert number to string
            query.empId = query.empId.toString();
            query.date = new Date().toISOString();
            query.date = moment().format();
            console.log('My query', query);

            http.employee.ponto(query, employee.action, function(resData) {
                //TODO: clear ponto form
                vm.baterPontoForm.$setPristine();
                vm.baterPontoForm.$setUntouched();
                vm.baterPontoForm.$setDirty(false);
                vm.employee = '';


                console.log(resData);
                vm.pontoRes = resData;
                console.log(vm.pontoRes);
                var ev;
                //                $timeout(function(){
                $mdDialog.show({
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    controller: 'DialogCtrl as vm',
                    templateUrl: '/views/ponto.diag.html',
                    locals: {
                        message: resData.res
                    }
                });
                //                }, 0)


            })
        };


        vm.closeDialog = function() {
            $mdDialog.cancel();
        }
        //        var minYear = 2016;
        //        var maxYear = 2017;
        //        var minMonth = 0;
        //        var maxMonth = 6;
        //        var day = 0;
        //        var InhourFirstPeriod = 8;
        //        var InMinMinute = 0;
        //        var InMaxMinute = 20;
        //        var seg = 0;
        //
        //        var turno1MinInHour = 8;
        //        var turno1MaxInHour = 8;
        //        var turno1MinInMin = 0;
        //        var turno1MaxInMin = 15;
        //
        //        var turno1MinOutHour = 11;
        //        var turno1MaxOutHour = 12;
        //        var turno1MinOutMin = 0;
        //        var turno1MaxOutMin = 59;
        //
        //        var turno2MinInHour = 14;
        //        var turno2MaxInHour = 14;
        //
        //        var turno2MinOutHour = 17;
        //        var turno2MaxOutHour = 18;
        //
        //        var turno2MinInMin = 0;
        //        var turno2MaxInMin = 15;
        //
        //        var turno2MinOutMin = 0;
        //        var turno2MaxOutMin = 59;
        //
        //        function getHours(minYear, maxYear, minMonth, maxMonth, minDay, minHour, maxHour, minMin, maxMin, callback) {
        //            var hour = 0;
        //            var min = 0;
        //            var seg = 0;
        //            var timeArray = [];
        //            for (var yearIndex = minYear; yearIndex <= maxYear; yearIndex++) {
        //                for (var monthIndex = minMonth; monthIndex <= maxMonth; monthIndex++) {
        //                    var maxDay = new Date(yearIndex, monthIndex + 1, 0).getDate();
        //                    for (var day = minDay; day <= maxDay; day++) {
        //                        hour = Math.floor(Math.random() * ((maxHour - minHour) + 1) + minHour);
        //                        min = Math.floor(Math.random() * ((maxMin - minMin) + 1) + minMin);
        //                        seg = Math.floor(Math.random() * ((59 - 0) + 1) + 0);
        //                        var d = new Date(yearIndex, monthIndex, day, hour, min, seg);
        //                        timeArray.push(d)
        //                    }
        //                }
        //            }
        //            return callback(timeArray)
        //        }

        //        var turno1InTimeArray = []
        //        var turno1OutTimeArray = []
        //        var turno2InTimeArray = []
        //        var turno2OutTimeArray = []
        //
        //        getHours(minYear, maxYear, minMonth, maxMonth, 1, turno1MinInHour, turno1MaxInHour, turno1MinInMin, turno1MaxInMin, function(data1) {
        //            //            console.log(data);
        //            turno1InTimeArray = data1;
        //
        //        })
        //
        //        getHours(minYear, maxYear, minMonth, maxMonth, 1, turno1MinOutHour, turno1MaxOutHour, turno1MinOutMin, turno1MaxOutMin, function(data2) {
        //            turno1OutTimeArray = data2;
        //        })
        //        console.log(turno1InTimeArray, turno1OutTimeArray);

        //                for (var k = 0; k < maxEmployees; k++) {
        //
        //                    for (var i = 0; i < data.length; i++) {}
        //                }
        //        vm.sendPonto = function() {
        //            var queryIn = {};
        //            var queryOut = {};
        //            queryIn.empId = "100";
        //            queryIn.turno = 'turno1'
        //            queryIn.password = "100000";
        //            queryIn.date = turno1InTimeArray[0];
        //
        //            queryOut.empId = "100";
        //            queryOut.turno = 'turno1'
        //            queryOut.password = "100000";
        //            queryOut.date = turno1OutTimeArray[0];
        //
        //
        //
        //            console.log('My query', queryIn);
        //            console.log('My query', queryOut);
        //            //
        //            http.employee.ponto(queryIn, 'openPonto', function(data1) {
        //                console.log(data1);
        //                $timeout(function() {
        //                    http.employee.ponto(queryOut, 'closePonto', function(data2) {
        //                        console.log(data2);
        //                        //                    vm.employeeOpenPonto = data
        //                    });
        //                }, 2000)
        //                //                vm.employeeOpenPonto = data
        //            });
        //        }
        //        })
        //        callback()
        //        //        },



    }


})();
