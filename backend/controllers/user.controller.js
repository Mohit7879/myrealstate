const { errorhandler } = require("../utils/error")
const User= require('../models/user.model.js')
const bcryptjs=require('bcryptjs')

  module.exports.updateUser=async (req,res,next)=>{

    if(req.user.id!==req.params.id) return next(errorhandler(401,"you can update your account "));
    try {
         
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }

            const updatedUser= await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    password: req.body.password,
                    username: req.body.username,
                    email: req.body.email,
                    avatar: req.body.avatar,
                }
            },{new:true})

            const {password,...rest}=updatedUser._doc;

            return res.status(200).json(rest);

        }
     catch (error) {
        next(error);
        
    }

  
    }


