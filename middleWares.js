const jwt = require('jsonwebtoken')

function authMiddleWare(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Користувач не авторизований"})
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedToken
        console.log("decoded token:", decodedToken)
        next()


    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Користувач не авторизований"})
    }

}

function roleMiddleWare(is_volunteer) {
    return function (req, res, next) {


        if (is_volunteer !== req.user.is_volunteer) {
            return res.status(403).json({message: "У вас немає доступу"})
        }

        next()


    }

}

module.exports = {
    authMiddleWare, checkPensioner: roleMiddleWare(false), checkVolunteer: roleMiddleWare(true)
}