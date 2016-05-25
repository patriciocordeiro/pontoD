(function() {
    'use strict';

    angular.module('pontoDApp').controller('statisticsCtrl', [statisticsCtrl]);


    function statisticsCtrl() {
        var vm = this;

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
                    if (data.turno1.isDelayIn || data.turno2.isDelayedIn) {
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
                totalDelaydIn = 0; //reinit
                totalAntiOut = 0;
                totalHora = 0;
                totalExtraHours = 0;
            }

            /*---------------------------------------------------------------------------*/
            vm.statisticsCreateChart = function(index) {
                console.log(vm.statisticsTabs[index || 0]);
                chartsMonthStatistics(vm.statisticsTabs[index].data)
                console.log(statisticsTypeArray);
            }

            vm.functionArray = [statistics.meanWorkedHours, statistics.meanDelaydin]
            /*---------------------------------------------------------------------------*/
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
            }

            console.log(moment().format('00:00:00'))
        }
    }
})();
