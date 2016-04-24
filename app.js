'use strict'
angular.module("pontoDApp", ['ui.router', 'ngMaterial', 'ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "^",
                abstract: true,
                template: '<ui-view/>',

            })
            .state('app.home', {
                //                abstract: true,
                url: "/home",
                templateUrl: 'home.view.html',
            })

        //if no state redirect to home
        $urlRouterProvider.otherwise('home');

    });
