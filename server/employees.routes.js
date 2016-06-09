(function() {
    'use strict';
    module.exports = function(app, express, passport, employeesWeb) {
        var router = express.Router();
        router.get('/getEmployees', employeesWeb.all);
        router.post('/getEmployeesBydepartment', employeesWeb.department);
        router.post('/getEmployee', employeesWeb.one);
        router.post('/getOnePonto', employeesWeb.onePonto);
        router.post('/signup', employeesWeb.signup);

        //        router.post('/signup', passport.authenticate('local-signup', {
        //            session: false
        //        }), function (req, res, next) {
        //            console.log(next);
        //            //            res.send(res.newUser);
        //        })

        app.use('/', router);
    };

})();
