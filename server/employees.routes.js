(function() {
    'use strict';
    module.exports = function(app, express, employeesWeb) {
        var router = express.Router();
        router.get('/getEmployees', employeesWeb.all);
        router.post('/getEmployeesBySector', employeesWeb.sector);

        app.use('/', router);
    };

})();
