const Controller = require("../controllers/controller");
const router = require('express').Router()



router.get('/', (req, res) => res.redirect('/home'))
router.get('/register', Controller.registerForm)
router.post('/register', Controller.saveRegister)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginSave)

router.get('/home', Controller.home)
router.use(function (req, res, next) {
    if (req.session.user) {
        next()
    }
    else {
        const error = 'Please login first'
        res.redirect('/login?error=${error}')
    }
})
// router.get('/home/:UserId/customer', Controller.homeCustomer)
module.exports = router