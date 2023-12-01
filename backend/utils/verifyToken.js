const { errorhandler } = require("./error");
const jwt =require('jsonwebtoken');



module.exports.verifyToken=(req,res,next)=>{
    try{
      //  console.log(req.cookies.access_token);
const token =req.cookies.access_token
console.log("token",token);
if(!token){
    return next(errorhandler(401,'unauthorised'))
}else{
    jwt.verify(token,'mohit',(err,user)=>{
        if(err){
            console.log(err);
               return next(errorhandler(403,'Forbidden'));
            }

        req.user=user;
        next()

    })
}
    }catch(err){
      next(err)
    }
}