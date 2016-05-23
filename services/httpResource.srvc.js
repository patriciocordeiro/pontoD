angular.module('pontoDApp').service('httpResSrvc', ['$resource',
    function($resource) {
    /*Http Resource*/
    this.ponto =
        $resource('http://localhost:3000/:acao/:employee/:id', {
            employee: '@employee',
            id: '@id',
            acao: '@acao'
        }, {
            'get': {
                method: 'GET',
                isArray: true
            },
            'save': {
                method: 'POST',
                isArray: false
            }
        })




}]);

