const User = require('../models/user')
const router = require('express').Router()

const {check} = require("express-validator")
const {validationResult} = require("express-validator")

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const saltRounds = 12;

const middleWare = require("../authMiddleware")


router.post("/registration", [
        check('phone')
            .matches('^380[5-9][0-9]\\d{7}$', 'm')
            .withMessage("Телефон має бути заданим у форматі 380XXXXXXXXX")
            .notEmpty()
            .withMessage("Телефон не може бути пустим"),

        check('password')
            .isLength({min: 6})
            .withMessage("Пароль має бути більше 6 символів")
            .notEmpty()
            .withMessage("Пароль не може бути пустим"),

        check('first_name')
            .notEmpty()
            .withMessage("Ім'я не може бути пустим"),

        check('last_name')
            .notEmpty()
            .withMessage("Прізвище не може бути пустим"),

        check('birthday')
            .notEmpty()
            .withMessage("Дата народження не може бути пустою")
            .isDate({format: 'YYYY-MM-DD'})
            .withMessage("Дата повинна бути заданою в форматі РРРР-MM-ДД")

    ],

    registration)
router.post("/login", [
        check('phone')
            .matches('^380[5-9][0-9]\\d{7}$', 'm')
            .withMessage("Телефон має бути заданим у форматі 380XXXXXXXXX")
            .notEmpty()
            .withMessage("Телефон не може бути пустим"),

        check('password')
            .isLength({min: 6})
            .withMessage("Пароль має бути більше 6 символів\"")
            .notEmpty()
            .withMessage("Пароль не може бути пустим"),
    ],


    login)

router.get("/users", middleWare.isAuthenticated, middleWare.isVolunteer, getUsers)

module.exports = router


async function registration(req, res) {
    try {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Помилка при реєcтрації", errors})
        }

        const {
            is_volunteer,
            phone,
            password,
            first_name,
            last_name,
            birthday,
            organization
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
            organization

        })

        if (user.is_volunteer) {
            user.is_free = true
            if (!user.organization) {
                return res.status(400).json({message: `Волонтер ${user.first_name} ${user.last_name} не належить до жодної організації`})
            }
        } else {
            user.is_free = null
            user.organization = null
        }

        await user.save()
        return res.json({message: "Користувач був успішно зареєстрований"})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Registration error"})

    }
}


async function login(req, res) {

    try {
        const {
            phone,
            password,
            is_volunteer
        } = req.body

        const user = await User.findOne({phone})
        if (!user) {
            return res.status(400).json({message: `Користувача з номером телефону ${phone} не знайдено`})
        }

        if(user.is_volunteer !== is_volunteer) {
            return res.status(400).json({message: "Ви спробували увійти в акаунт, що не відповідає Вашій ролі."})
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: "Невірний пароль"})
        }
        const token = generateAccessToken(user._id, user.is_volunteer)
        return res.json({token})

    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Login error"})
    }
}


const generateAccessToken = (_id, is_volunteer) => {
    const payload = {
        _id,
        is_volunteer
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"});
}


async function getUsers(req, res) {
    try {
        const users = await User.find()
        res.json(users)

    } catch (e) {
        console.log(e)
    }
}







