(function() {
    'use strict';
    module.exports = function(app, express,passport, employeesWeb) {
        var router = express.Router();
        router.get('/getEmployees', employeesWeb.all);
        router.post('/getEmployeesBySector', employeesWeb.sector);
        router.post('/getEmployee', employeesWeb.one);
        router.post('/signup', passport.authenticate('local-signup'), function(req, res, next) {
            console.log(req.body);
            res.send(req.newUser);
        })

        app.use('/', router);
    };

})();
