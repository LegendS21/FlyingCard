const Controller = require("../controllers/controller");
const router = require('express').Router()
const session = require('express-session')
router.get('/register', Controller.registerForm)
router.post('/register', Controller.saveRegister)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginSave)
router.get('/logout', Controller.logoutForm)
router.use(function (req, res, next) {
    if (req.session.user) {
        next()
    }
    else {
        const error = `Please login first`
        res.redirect(`/login?error=${error}`)
    }
})

router.use(function (req, res, next) {
    if (req.session.user.role === 'admin') {
        next()
    }
    else {
        const err = `You don't have access`
        res.redirect(`/home?error=${err}`)
    }
})
router.get('/home/:UserId/admin', Controller.adminForm)
router.get('/home/:UserId/admin/addFlight', Controller.addFlight)
router.post('/home/:UserId/admin/addFlight', Controller.saveFlight)
router.get('/home/:UserId/admin/addFlight/:flightId', Controller.removeFlight)
module.exports = router