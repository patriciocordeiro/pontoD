(function() {
    'use strict';

    angular.module('pontoDApp').service('reportSrvc', ['httpCallSrvc',
        function(httpCallSrvc) {
            /*Automate the generation of tabs*/
            this.employeeId = '';
            this.reportYear = '';
            this.report = {
                getDepartments : function(){
                    httpCallSrvc.api.getByQuery({name:'department'}, 'getDepartments', function(res){
console.log(res);
                    });
                },
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ],
                weekDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],

                tabs: [{
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
                            value: 'totalWorkedTime',


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
                            property: 'isExtraTime',
                            value: 'totalExtraTime',



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
                            property: 'isFaultTime',
                            value: 'Z'
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

                ],
                tabsTwoCols: [{
                    label: 'Assiduidade',
                    title: 'Relatório de assiduidade',
                    turno: [{
                        index: 'turno1',
                        title: 'Primeiro Turno (manhã)',
                        subtitle1: 'Total de entradas atrasadas',
                        subtitle2: 'Total de saídas antecipadas',
                        cols: [{
                            title: 'Entrada atrasada ',
                            property: 'isDelayedIn',
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
                            property: 'isDelayedIn',
                            value: 'inTime'
                        }, {
                            title: 'Saída antecipada',
                            property: 'isAntiOut',
                            value: 'outTime'

                        }, ]

                    }]

                }]
            };

        }
    ]);
})();
