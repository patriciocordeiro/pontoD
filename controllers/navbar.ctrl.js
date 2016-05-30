(function() {
    'use strict';

    angular.module('pontoDApp').controller('navBarCtrl', [navBarCtrl]);

    function navBarCtrl() {
        var vm = this;
        vm.navbarItems = [{
            item: 'Home',
            url: 'app.home',
            icon: 'home'
        }, {
            item: 'Bater ponto',
            url: 'app.ponto',
            icon: 'assignment_ind'
        }, {
            item: 'Pontos abertos',
            url: 'app.openPonto',
            icon: 'lock_open'
        }, {
            item: 'Relatórios',
            url: 'app.relatorios',
            icon: 'assignment'
        }, {
            item: 'Estatísticas',
            url: 'app.estatisticas',
            icon: 'insert_chart'
        }];
    }
})();
