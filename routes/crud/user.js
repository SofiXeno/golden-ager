
const auth = require("../../middleWares")

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





// create user ??auth.checkPensioner
router.post('/create', auth.authMiddleWare, auth.checkPensioner , async function(req, res) {
    console.log(req.body)


    const user = new User({

        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id,
        time: req.body.time,
        pensioner_id: req.user._id


    });
    try{
        await user.save();
        return res.json({message:'Successfully created new user'})
    }catch (e){
        console.log(e);
        res.json({message:e.message})
    }
})


module.exports = router