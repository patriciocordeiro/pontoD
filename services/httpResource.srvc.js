angular.module('pontoDApp').service('httpResSrvc', ['$resource',
    function ($resource) {
        /*Http Resource*/
        var url = 'http://localhost:3000/';
        //        var url = 'http://192.168.12:3000/';

        this.resource =
            $resource(url + ':acao/:employee/:id', {
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




    }
]);