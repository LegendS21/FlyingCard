const { User, Profile, Ticket, Flight, Transaction } = require('../models')
const bcrypt = require('bcryptjs');
class Controller {
    static async registerForm(req, res) {
        const { error } = req.query
        try {
            res.render('addUser', { error })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async saveRegister(req, res) {
        const { username, password } = req.body
        try {
            await User.create({ username, password })
            res.redirect('/register')
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                res.redirect(`/register?error=username is taken`)
            } else {
                res.send(error)
            }
        }
    }
    static async loginForm(req, res) {
        const { error } = req.query
        try {
            res.render('loginForm', { error })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async loginSave(req, res) {
        const { username, password } = req.body
        try {
            let user = await User.findOne({ where: { username } })
            if (user) {
                const isValid = bcrypt.compareSync(password, user.password)
                if (isValid) {
                    req.session.user = { id: user.id, username: user.username, role: user.role }
                    res.redirect('/')
                } else {
                    const error = "invalid username/password"
                    res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "invalid username/password"
                res.redirect(`/login?error=${error}`)
            }
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
}

module.exports = Controller