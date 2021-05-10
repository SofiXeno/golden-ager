const User = require('../models/user')
const router = require('express').Router()
const {check} = require("express-validator")
const bcrypt = require('bcrypt');
const saltRounds = 12;


router.post("/registration", [
        check('phone')
            .isMobilePhone("uk-UA")
            .notEmpty()
            .withMessage("Телефон має бути заданим у форматі 380XXXXXXXXX"),

        check('password')
            .isLength({ min: 6 })
            .notEmpty()
            .withMessage("Пароль має бути більше 6 символів"),

        check('first_name')
            .notEmpty()
            .withMessage("Ім'я не може бути пустим"),

        check('last_name')
            .notEmpty()
            .withMessage("Прізвище не може бути пустим"),

        check('birthday')
            .notEmpty()
            .isDate({format: 'DD-MM-YYYY'})
            .withMessage("Дата повинна бути заданою в форматі ДД-ММ-РРРР"),

        check('organization')
            .notEmpty()
            .withMessage("Назва організації не може бути пустою")

    ],

    registration)
router.post("/login", login)
router.post("/users", getUsers)

module.exports = router


async function registration(req, res) {
    try {
        const {
            is_volunteer,
            phone,
            password,
            first_name,
            last_name,
            birthday,
            organization,
            is_free
        } = req.body

        const candidate = await User.findOne({phone})
        if (candidate) {
            return res.status(400).json({message: "Користувач з таким номером телефону уже існує"})
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            is_volunteer,
            phone,
            password: hashPassword,
            first_name,
            last_name,
            birthday,
            organization,
            is_free
        })
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




