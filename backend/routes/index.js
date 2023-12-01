const router=require('express').Router();
const homeimage=require('../models/homeimages.js')
router.use('/api/user',require('./user.route'))
router.use('/api/auth',require('./auth.route'))
router.use('/api/listing',require('./listing.route'))
router.get('/',(req,res)=>{
    res.json({
        message:'hello world',
    })
})

module.exports=router;