const { waktu, rupiah, date } = require('../helper/helper');
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
            res.redirect('/login')
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
                    if (user.role !== 'admin') {
                        res.redirect(`/home/${user.id}/customer`)
                    } else {
                        res.redirect(`/home/${user.id}/admin`)
                    }
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
    static async adminForm(req, res) {
        const { UserId } = req.params
        try {
            let user = await User.findByPk(UserId)
            let flight = await Flight.findAll()
            // res.send(flight)
            res.render('adminForm', { user, flight, waktu, date, rupiah })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async addFlight(req, res) {
        try {
            res.render('addFlight')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async logoutForm(req, res) {
        try {
            req.session.destroy(err => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect(`/login`)
                }
            })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async saveFlight(req, res) {
        const { UserId } = req.params
        const { airlineName, destination, origin, availabeSeat, price, type, arrived, imageURL, dateFlight } = req.body
        try {
            let addFlight = await Flight.create({ airlineName, destination, origin, availabeSeat, price, type, arrived, imageURL, dateFlight })
            // res.send(addFlight)
            res.redirect(`/home/${UserId}/admin`)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async removeFlight(req, res) {
        const { UserId, flightId } = req.params
        try {
            await Flight.destroy({
                where: { id: flightId }
            })
            res.redirect(`/home/${UserId}/admin`)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
}

module.exports = Controller