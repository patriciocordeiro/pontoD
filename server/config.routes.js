module.exports = function(app, express, configApi) {
    var router = express.Router()
    router.get('/getFormFields', configApi.getformFields);
    router.post('/insertNewIputFields', configApi.insertNewIputFields);
    router.post('/getDepartments', configApi.getDepartments);

    app.use('/',router);
};
