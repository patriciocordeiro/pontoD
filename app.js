'use strict'
angular.module("pontoDApp", ['ui.router', 'ngMaterial', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {
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
                templateUrl: '/views/openPonto.view.html',
                controller: 'Ctrl as vm',
            })
            .state('app.ponto', {
                //                abstract: true,
                url: "/ponto",
                templateUrl: '/views/ponto.view.html',
                controller: 'Ctrl as vm',
            })
            .state('app.relatorios', {
                //                abstract: true,
                url: "/relatorios",
                templateUrl: '/views/relatorios.view.html',
                controller: 'Ctrl as vm',
            })

        //if no state redirect to home
        $urlRouterProvider.otherwise('home');

    });