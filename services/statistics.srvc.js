(function() {
    'use strict';

    angular.module('pontoDApp').service('statisticsSrvc', [
        function() {
            this.tabs = [{
                label: 'Horas Trabalhadas',
                total: {
                    title: "Total de horas trabalhadas por mês",
                    value: 'workedHourPerMonth'
                },
                mean: {
                    title: "Média de horas trabalhadas por mês",
                    value: 'workedHourPerMonth'
                }
            }, {
                label: 'Entradas atrasadas',
                total: {
                    title: 'Todas de entradas atrasadas por mês',
                    value: 'delayedInPerMonth',
                },
                mean: {
                    title: "Média entradas atrasadas por mês",
                    value: 'delayedInPerMonth'
                }
            }, {
                label: 'Saídas antecipadas',
                total: {
                    title: 'Total de saídas antecipadas por mês',
                    value: 'antiOutPerMonth'
                },
                mean: {
                    title: "Média de saídas antecipadas por mês",
                    value: 'antiOutPerMonth'
                }
            }, {
                label: 'Horas extras',
                total: {
                    title: "Média de horas extras por mês",
                    value: 'extraHoursPerMonth'

                },
                mean: {
                    title: "Média de horas extras por mês",
                    value: 'extraHoursPerMonth'
                }
            }];


        }
    ])
})();
