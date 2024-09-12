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
            let profile = await Profile.findOne({
                where: {
                    UserId: UserId
                },
                include: { model: User }
            })
            // res.send(profile)
            res.render('adminForm', { profile, user, flight, waktu, date, rupiah })
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
    static async profileForm(req, res) {
        const { UserId } = req.params
        try {
            let user = await User.findByPk(UserId)
            let findprofile = await Profile.findOne({
                where: {
                    UserId: UserId
                },
                include: {
                    model: User
                }
            })
            if (findprofile) {
                res.render('updateProfile', { findprofile })
            } else {
                res.render('addProfile', { user })
            }
            // res.send(findprofile)
            // res.send(user)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async saveProfile(req, res) {
        const { UserId } = req.params
        const { fullname, gender, phone, email } = req.body
        try {
            let user = await User.findByPk(UserId)
            let findprofile = await Profile.findOne({
                where: {
                    UserId: UserId
                },
                include: {
                    model: User
                }
            })
            if (findprofile) {
                await Profile.update(
                    { UserId, fullname, gender, phone, email },
                    { where: { UserId: UserId } },)
            } else {
                await Profile.create({ UserId, fullname, gender, phone, email })
            }
            if (user.role === 'admin') {
                res.redirect(`/home/${UserId}/admin`)
            }
            else {
                res.redirect(`/home/${UserId}/customer`)
            }
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async updateFlight(req, res) {
        const { UserId, flightId } = req.params
        try {
            let findFlight = await Flight.findOne({
                where: {
                    id: flightId
                }
            })
            let Dated
            if (findFlight) {
                let newDate = date(findFlight.dateFlight)
                let dated = newDate.split('/')
                Dated = `${dated[2]}-${dated[1]}-${dated[0]}`
            }
            // res.send(findFlight)
            res.render('updateFlight', { findFlight, waktu, date, rupiah, Dated })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async saveUpdateFlight(req, res) {
        const { UserId, flightId } = req.params
        const { airlineName, destination, origin, availabeSeat, price, type, arrived, imageURL, dateFlight } = req.body
        try {
            await Flight.update({ airlineName, destination, origin, availabeSeat, price, type, arrived, imageURL, dateFlight }, { where: { id: flightId } })
            res.redirect(`/home/${UserId}/admin`)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async home(req, res) {

        try {
            const flights = await Flight.findAll()
            // res.send(flights)

            res.render('home', { flights })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async homeUser(req, res) {
        const { UserId } = req.params
        try {
            const flights = await Flight.findAll()

            const user = await User.findByPk(UserId)
            // res.send(user)
            let profile = await Profile.findOne({
                where: {
                    UserId: UserId
                }
            })
            res.render('homeUsers', { flights, user, profile })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async buyTicketForm(req, res) {
        const { UserId, flightId } = req.params
        try {
            let user = await User.findOne({
                where: {
                    id: UserId,
                },
                include: Profile
            })
            let flight = await Flight.findOne({
                where: {
                    id: flightId
                }
            })
            // res.send({user,flight})
            res.render('buyTicket', { user, flight, waktu, date, rupiah })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async logoutHome(req, res) {
        try {
            req.session.destroy(err => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/home')
                }
            })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async saveTicketForm(req, res) {
        const { UserId, flightId } = req.params
        const { totalSeat, totalPrice, statusPayment } = req.body
        try {
            let readprof = await User.findOne({
                where: { id: UserId },
                include: {
                    model: Profile
                }
            })
            // console.log(UserId);
            let saveTrans = await Transaction.create({
                ProfileId: readprof.Profile.id, totalSeat, totalPrice, statusPayment
            })
            res.redirect(`/home/${UserId}/${flightId}/ticket`)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async buyForm(req, res) {
        const { UserId, flightId } = req.params
        try {
            let readprof = await User.findOne({
                where: { id: UserId },
                include: {
                    model: Profile,
                    include: Transaction
                }
            })
            let flight = await Flight.findOne({
                where: {
                    id: flightId
                }
            })
            // res.send()
            res.render('buyForm', { readprof, flight, waktu, date, rupiah })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async saveBuy(req, res) {
        const { UserId, flightId } = req.params
        const { TransactionId, passanger, NIK, dateOfBirth, gender, baggage } = req.body
        try {
            let create = await Ticket.create({
                TransactionId: TransactionId, FlightId: flightId, passanger, NIK, dateOfBirth, gender, baggage
            })
            // let destroy = await Transaction.destroy({
            //     where: {
            //         id: TransactionId
            //     }
            // })
            await Flight.increment({ availabeSeat: -1 }, { where: { id: flightId } })
            res.redirect(`/home/${UserId}/customer`)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
}
module.exports = Controller