const auth = require("../../authMiddleware")

const router = require('express').Router()
const Task = require('../../models/task')
const User = require('../../models/user')


// get all tasks on page
router.get('/', async (req, res) => {
    return res.json(await Task.find())
})

// :id -> task id
router.post('/take/:_id', auth.isAuthenticated, auth.isVolunteer, async (req, res) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if (!user.is_free) {
        return res.status(400).json({success: false, message: 'Ви вже маєте завдання.'})
    }
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
    await User.updateOne({_id: req.user._id}, {is_free: false})
    return res.json({success: true, message: "Завдання обрано успішно."})
})

router.get('/availableTasks', auth.isAuthenticated, auth.isVolunteer, async (req, res) => {
    const doc = await Task.find({volunteer_id: null})
        .populate('pensioner_id', 'first_name last_name')
        .populate('template_id', 'title description time')
        .exec()
    return res.json(doc)
})

//create personal task
//create personal task
router.post('/create', auth.isAuthenticated, auth.isPensioner, async function (req, res) {
    console.log(req.body)
    const task = new Task({
        template_id: req.body.template_id,
        pensioner_id: req.user._id
    });
    try {
        await task.save();
        return res.json({message: 'Завдання створено успішно'})
    } catch (e) {
        console.log(e);
        if(e.code === 11000) {
            return res.status(400).json({message: 'Ви вже створили завдання.'})
        }
        return res.status(400).json({message: e.message})
    }
})

router.get('/completedTasks', auth.isAuthenticated, async (req, res) => {
    const filter = {task_is_done: true}
    let populationField
    if (req.user.is_volunteer) {
        filter.volunteer_id = req.user._id
        populationField = 'pensioner_id'
    } else {
        filter.pensioner_id = req.user._id
        populationField = 'volunteer_id'
    }
    return res.json(await Task.find(filter)
        .populate(populationField, 'first_name last_name')
        .populate('template_id', 'title description time')
        .exec())
})

router.get('/currentTask', auth.isAuthenticated, async (req, res) => {
    const filter = {task_is_done: false}
    let populationField
    if (req.user.is_volunteer) {
        filter.volunteer_id = req.user._id
        populationField = 'pensioner_id'
    } else {
        filter.pensioner_id = req.user._id
        populationField = 'volunteer_id'
    }
    const doc = await Task.findOne(filter)
        .populate(populationField, 'first_name last_name')
        .populate('template_id', 'title description time')
        .exec()
    if (!doc) {
        return res.status(404).json({message: "У Вас немає обраного завдання."})
    }
    return res.json(doc)
})

router.get('/currentVolunteer', auth.isAuthenticated, auth.isPensioner, async (req, res) => {
    const task = await Task.findOne({pensioner_id: req.user._id})
    if (!task) {
        return res.status(404).json({message: "Завдання немає."})
    }
    const volunteer = task.volunteer_id ? await User.findOne({_id: task.volunteer_id}) : null
    return res.json({volunteer: volunteer})
})
//task is done
router.post('/complete/', auth.isAuthenticated, auth.isPensioner, async (req, res) => {
    const task = await Task.findOne({pensioner_id: req.user._id})
    if (!task) {
        return res.status(404).json({message: "Завдання не існує."})
    }
    await Task.updateOne({_id: req.params._id}, {task_is_done: true})
    await User.updateOne({_id: task.volunteer_id}, {is_free: true})
    return res.json({success: true, message: "Завдання виконано."})

})

//delete personal task??

module.exports = router