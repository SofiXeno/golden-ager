const router = require('express').Router()
const Category = require('../../models/category')

//get all categories
router.get('/', async (req, res) => {
    return res.json(await Category.find())
})

module.exports = router