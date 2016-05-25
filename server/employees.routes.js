module.exports = function(app, express, employeesWeb) {
var router = express.Router()
router.get('/getEmployees', employeesWeb.all)

app.use('/',router)
}
