const router = require('express').Router()
const Category = require('../../models/category')

router.get('/', async (req, res) => {
    return res.json(await Category.find())
})

module.exports = router