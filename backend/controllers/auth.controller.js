const User =  require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const { errorcreate, errorhandler}  = require('../utils/error');

module.exports.signup=async (req,res,next)=>{

    try{
         console.log(req.body);
     const { username,email,password}=req.body;
   
    const hashedPassword  = await bcrypt.hash(password, 10);// we can give salt value to 12 to make it safer
    const newUser =  new User({
        username,email,
        password:hashedPassword,
    })
    await newUser.save();
    return res.status(201).json('user created successfully');

}catch(err){
  
  next(err)
}

}

module.exports.signin = async (req,res,next)=>{

    const {email,password}=req.body;

    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorhandler(404,'User not found '));
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword) return next(errorhandler(401,'Invalid password'))
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=validUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    console.log(rest);
   
    }catch(err){

          next(err);
     }


}