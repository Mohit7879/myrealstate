const router=require('express').Router();

router.use('/api/user',require('./user.route'))
router.use('/api/auth',require('./auth.route'))
router.get('/',(req,res)=>{
    res.json({
        message:'hello world',
    })
})

module.exports=router;