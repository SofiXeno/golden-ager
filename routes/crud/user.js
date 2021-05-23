
const auth = require("../../authMiddleware")

const router = require('express').Router()
const User = require('../../models/user')

//знайти вільних волонтерів
router.get('/findFreeVolunteers', async (req, res) => {
    return res.json(await User.find({ is_volunteer:true, is_free:true}))
})


router.get("/current", auth.isAuthenticated, async (req, res) => {
    return res.json(await User.findOne({_id: req.user._id}))
})


//знайти юзера по ід +
router.get('/:_id', async (req, res) => {
    return res.json(await User.find({_id:req.params._id}))
})





// create user ??auth.checkPensioner
router.post('/create', auth.isAuthenticated, auth.isPensioner , async function(req, res) {
    const user = new User({
        phone: req.body.phone,
        password : req.body.password,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        birthday:req.body.birthday,
        is_volunteer:req.body.is_volunteer
    });
    try{
        await user.save();
        return res.json({message:'Successfully created new user'})
    }catch (e){
        console.log(e);
        res.json({message:e.message})
    }
})



//волонтер виходить в онлайн
router.post("/goOnline/:_id", auth.isAuthenticated, async (req, res) => {
    return res.json(await User.updateOne({_id:req.params._id}, {is_free:true}))
})

//волонтер виходить в офлайн
router.post("/goOffline/:_id", auth.isAuthenticated, async (req, res) => {
    return res.json(await User.updateOne({_id:req.params._id}, {is_free:false}))
})

module.exports = router