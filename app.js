const express = require("express");
const router = require("./routers");
const app = express()
const port = 3000
const session = require('express-session')
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true // untuk security dari csrf attack 
    }
}))
app.use(router); 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})