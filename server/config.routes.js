module.exports = function(app, express, configApi) {
    var router = express.Router()
    router.get('/getFormFields', configApi.getformFields);
    router.post('/insertNewIputFields', configApi.insertNewIputFields);

    app.use('/',router);
};
