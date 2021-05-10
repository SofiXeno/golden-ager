const User = require('../models/user')
const router = require('express').Router()
const bcrypt = require('bcrypt');
const saltRounds = 12;



router.get("/registration", registration)
router.get("/login", login)
router.get("/users", getUsers)

module.exports = router


async function registration(req, res) {
    try {
        const {phone, password} = req.body
        const candidate = await User.findOne({phone})
        if (candidate){
            return res.status(400).json({message: "Користувач з таким номером телефону уже існує"})
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = new User({phone, password: hashPassword})
        await user.save()
        return res.json({message: "Користувач був успішно зареєстрований"})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})

    }
}


async function login(req, res) {
    try {

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Login error"})
    }
}


async function getUsers(req, res) {
    try {
        res.json('server works')

    } catch (e) {

    }
}




