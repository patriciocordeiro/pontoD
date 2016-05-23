(function() {
    'use strict';

    angular.module('pontoDApp').controller('pontoCtrl', ['httCallSrvc', pontoCtrl]);

    function pontoCtrl(httCallSrvc) {
        var vm = this;
        var http = httCallSrvc;
        console.log('Controller de ponto iniciado');

        console.log(http.employee.getAll);
        var now = moment().toISOString();
        console.log(now);

//        vm.getPontoOpenClose();
        vm.getPontoOpenClose = function(employee) {
            console.log(employee);
            var query = {};
            query = employee;
            //convert number to string
            query.empId = query.empId.toString();
            query.date = new Date().toISOString()
            query.date =   moment().format();
            console.log('My query', query);

            http.employee.ponto(query, employee.action, function(resData) {
                console.log(resData);
                //                vm.employeeOpenPonto = data
            })
        }
    }
})()
