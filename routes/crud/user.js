const router = require('express').Router()
const User = require('../../models/user')

router.get('/', async (req, res) => {
    return res.json(await User.find({is_volunteer:true, is_free:true}))
})

router.get('/:_id', async (req, res) => {
    return res.json(await User.find({_id:req.params._id}))
})


// router.post('/:_id', async (req, res) => {
//     return res.json(await User.find({_id:req.params._id}))
// })


module.exports = router