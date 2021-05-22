const auth = require("../../authMiddleware")

const router = require('express').Router()
const Task = require('../../models/task')


// get all tasks on page
router.get('/', async (req, res) => {
    return res.json(await Task.find())
})

// :id -> task id
router.post('/take/:_id', auth.isAuthenticated, auth.isVolunteer, async (req, res) => {
    const updateResult = await Task.updateOne(
        {
            _id: req.params._id,
            volunteer_id: null
        }, {
            volunteer_id: req.user._id
        })
    console.log(updateResult)
    if (updateResult.nModified === 0) {
        return res.status(400).json({
            success: false,
            message: "Це завдання вже було обрано іншим волонтером або видалено. Будь ласка, оновіть сторінку."
        })
    }
    return res.json({success: true, message: "Завдання обрано успішно."})
})

// create personal task
router.post('/', auth.isAuthenticated, auth.isPensioner, async function (req, res) {
    console.log(req.body)
    const task = new Task({
        template_id: req.body.template_id,
        pensioner_id: req.user._id
    });
    try {
        await task.save();
        return res.json({message: 'Success'})
    } catch (e) {
        console.log(e);
        res.json({message: e.message})
    }
})

router.get('/completedTasks', auth.isAuthenticated, async (req, res) => {
    const filter = {task_is_done: true}
    if (req.user.is_volunteer) {
        filter.volunteer_id = req.user._id
    } else {
        filter.pensioner_id = req.user._id
    }
    return res.json(await Task.find(filter))
})

//task is done
router.post('/complete/:_id', auth.isAuthenticated, auth.isPensioner, async (req, res) => {
    return res.json(await Task.updateOne({_id: req.params._id}, {task_is_done: true}))
})

//список завдань волонтера
router.get('/volunteer/:_id', async (req, res) => {

    const doc = await Task.findOne({_id: req.params._id})
    if (doc.volunteer_id !== null)
        return res.status(400).json({success: false, message: "Це завдання вже обрано іншим волонтером"})
})
//delete personal task??

module.exports = router