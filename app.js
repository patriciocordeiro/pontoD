'use strict'
angular.module("pontoDApp", ['ui.router', 'ngMaterial', 'ngMessages','validation.match', 'ngResource', 'highcharts-ng', 'chart.js', 'angularMoment', 'ui.mask', 'ngFileUpload', 'ngImgCrop'])
    .run(function(employeeSrvc, amMoment) {

    //Moment config
    amMoment.changeLocale('pt-br');//local to pt br

    })
    .config(function($stateProvider, $urlRouterProvider, ChartJsProvider, $mdThemingProvider) {

        // Configure all charts

        /*Angular theme configuration*/
        $mdThemingProvider.theme('default')
        //            .primaryPalette('teal')
        .primaryPalette('blue')
        //        .primaryPalette('indigo')
        .accentPalette('red');


        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: false
        });

        $stateProvider
            .state('app', {
                url: "^",
                abstract: true,
                template: '<ui-view/>',

            })
            .state('app.home', {
                //                abstract: true,
                url: "/home",
                templateUrl: '/views/home.view.html',
            })
            .state('app.openPonto', {
                //                abstract: true,
                url: "/openPonto",
                templateUrl: '/views/openedPonto.view.html',
                controller: 'pontoCtrl as vm',
            })
            .state('app.ponto', {
                //                abstract: true,
                url: "/ponto",
                templateUrl: '/views/ponto.view.html',
                controller: 'pontoCtrl as vm',
            })
            .state('app.relatorios', {
                //                abstract: true,
                url: "/relatorios",
                templateUrl: '/views/relatorios.view.html',
                controller: 'relatorioCtrl as vm',
            })
            .state('app.cadastro', {
                //                abstract: true,
                url: "/cadastro",
                templateUrl: '/views/cadastro.view.html',
            controller: 'employeeCtrl as vm',
            })
            .state('app.estatisticas', {
                //                abstract: true,
                url: "/estatisticas",
                templateUrl: '/views/estatisticas.view.html',
                controller: 'relatorioCtrl as vm',
            })
            .state('app.employee', {
                //                                abstract: true,
                url: "/employee/:id",
                templateUrl: '/views/employee.view.html',
                controller: 'employeeCtrl as vm',
            });
        //            .state('app.employee.id', {
        //                //                abstract: true,
        //                url: "/:id",
        //                templateUrl: '/views/estatisticas.view.html',
        //                controller: 'relatorioCtrl as vm',
        //            });

        //if no state redirect to home
        $urlRouterProvider.otherwise("app.home");

    });
