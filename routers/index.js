const Controller = require("../controllers/controller");
const router = require('express').Router()

router.get('/register', Controller.registerForm)
router.post('/register', Controller.saveRegister)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginSave)
module.exports = router