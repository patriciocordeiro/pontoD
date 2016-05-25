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




        //Setor de trabalho
        vm.employee = {
            setor: ''
        } //salva o setor selecionado
        vm.setor = ['Administraçao', 'Pedagógica', 'Recursos', 'Humanos', 'Pedagógico', ]
        //Array dos meses do ano



        //get index of clicked menu index
        vm.isActive = false; //set the active mennu button
        vm.getIndex = function(index) {
            console.log(index);
            return vm.isActive = index
        }



        var employeeWorkTrue = {
            month: 'january',
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, -1, 24, 25, 26, 27, -1, 29, 30, 31]
        }

        /*Calendário------------------------------------------------------------------*/
        //Calendar object
        //        vm.calendar = {}
        //        vm.calendar.weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sab'];

        /*--------------------------------------------------------------------------------------------------------------*/
        /*Relatorios*/
        //1462653588952





    }
})();
