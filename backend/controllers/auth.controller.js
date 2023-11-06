const User =  require('../models/user.model')
const bcrypt = require('bcrypt');
const { errorhandler } = require('../utils/error');

module.exports.signup=async (req,res,next)=>{

    try{
 
     const { username,email,password}=req.body;
 
    const hashedPassword  = await bcrypt.hash(password, 10);// we can give salt value to 12 to make it safer
    const newUser =  new User({
        username,email,
        password:hashedPassword,
    })
    await newUser.save();
    return res.status(201).json('user created successfully');

}catch(err){
  
    next(err);
}


  

}