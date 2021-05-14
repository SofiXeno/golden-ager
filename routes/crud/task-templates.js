const router = require('express').Router()
const TaskTemplates = require('../../models/task-templates')


router.get('/', async (req, res) => {
    return res.json(await TaskTemplates.find())
})

// get all tasks from selected category
router.get('/getByCategory/:category_id', async (req, res) => {
    return res.json(await TaskTemplates.find({category_id:req.params.category_id}))
})




module.exports = router