const router = require('express').Router()
const TaskTemplates = require('../../models/category')

router.get('/', async (req, res) => {
    return res.json(await TaskTemplates.find())
})

module.exports = router