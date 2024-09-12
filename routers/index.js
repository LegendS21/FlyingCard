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

router.get('/home/:UserId/profile', Controller.profileForm)
router.post('/home/:UserId/profile', Controller.saveProfile)
router.get('/home/:UserId/update', Controller.profileForm)
router.post('/home/:UserId/update', Controller.saveProfile)
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
router.get('/home/:UserId/admin/addFlight/:flightId/delete', Controller.removeFlight)
router.get('/home/:UserId/admin/addFlight/:flightId/update', Controller.updateFlight)
router.post('/home/:UserId/admin/addFlight/:flightId/update', Controller.saveUpdateFlight)



module.exports = router