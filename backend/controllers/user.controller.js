const { errorhandler } = require("../utils/error")
const User= require('../models/user.model.js')
const bcryptjs=require('bcryptjs');
const Listing = require("../models/listing.model.js");


  module.exports.updateUser=async (req,res,next)=>{

    if(req.user.id!==req.params.id) return next(errorhandler(401,"you can only update your account "));
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


    module.exports.deleteUser=async(req,res,next)=>{ 
        if(req.user.id!==req.params.id) return next(errorhandler(401,"you can only delete your account "));
          
        try {

           await User.findByIdAndDelete(req.params.id);
           res.clearCookie('access_token');
         return res.status(200).json('user deleted successfully')
        } catch (error) {

            next(error)
            
        }
     


    }


    module.exports.getuserlisting=async (req,res,next)=>{

        try{
        if(req.user.id!==req.params.id){
                 return next(errorhandler(401,"you can view your own listing"))
        }else{

            const listings=await Listing.find({userRef:req.params.id})
            return res.status(200).json(listings);

        }
    }
    catch(err){
        next(err)
    }
}


