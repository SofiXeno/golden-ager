const auth = require("../../middleWares")

const router = require('express').Router()
const Task = require('../../models/task')


// get all tasks on page
router.get('/', async (req, res) => {
    return res.json(await Task.find())
})

// get task by name
router.get('/:title', async (req, res) => {
    return res.json(await Task.find({title:req.params.title}))
})

// get all tasks from selected category
router.get('/:category_id', async (req, res) => {
    return res.json(await Task.find({category_id:req.params.category_id}))
})

// router.post('/:_id', async (req, res) => {
//     return res.json(await Task.find({_id:req.params._id}))
// })

// create personal task
router.post('/create', auth.authMiddleWare, auth.checkPensioner , async function(req, res) {
    console.log(req.body)


    const task = new Tasks({

        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id,
        time: req.body.time,
        pensioner_id: req.user._id


    });
    try{
        await task.save();
        return res.json({message:'Success'})
    }catch (e){
        console.log(e);
        res.json({message:e.message})
    }
})

//task is done
router.post('/done/:_id', async (req, res) => {
    return res.json(await Task.updateOne({_id:req.params._id}, {task_is_done:true}))
})


//delete personal task??

module.exports = router