const User = require('../models/user')
const router = require('express').Router()


router.get("/registration", registration)
router.get("/login",login)
router.get("/users",getUsers)

module.exports = router


async function registration(req, res) {

    try{

    }catch (e) {

    }
}



async function login(req, res) {
    try{

    }catch (e) {

    }
}



async function getUsers(req, res) {
    try{
        res.json('server works')

    }catch (e) {

    }
}




