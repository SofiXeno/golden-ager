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
router.post('/', async function(req, res) {
    console.log(req.body)
    const task = new Tasks({
        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id,
        time: req.body.time
        // pensioner_id: req.body.
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
router.post('/update', async function (req, res) {
    console.log('upd')
    console.log(req)
    console.log(req.body)
    const newData = {}
    if(req.body.name) {
        newData.name = req.body.name
    }
    if(req.body.surname) {
        newData.surnname = req.body.surname
    }
    if(req.body.email) {
        newData.email = req.body.email
    }
    await EmailModel.updateOne({_id:req.body._id}, newData)
    res.json({message:'Success'})
})

module.exports = router