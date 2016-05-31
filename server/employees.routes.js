(function() {
    'use strict';
    module.exports = function(app, express, employeesWeb) {
        var router = express.Router();
        router.get('/getEmployees', employeesWeb.all);
        router.post('/getEmployeesBySector', employeesWeb.sector);
        router.post('/getEmployee', employeesWeb.one);

        app.use('/', router);
    };

})();
