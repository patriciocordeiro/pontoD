module.exports = function(app, express, pontoWeb) {
    var router = express.Router()
    router.get('/openedPonto', pontoWeb.openedPontoWeb)
    router.post('/openPonto', pontoWeb.openPontoWeb)
    router.post('/closePonto', pontoWeb.closePontoWeb)

    app.use('/',router)
}
