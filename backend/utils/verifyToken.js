const { errorhandler } = require("./error");
const jwt =require('jsonwebtoken');



module.exports.verifyToken=(req,res,next)=>{
    try{
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWRlM2Q5YjIwYTkwOGI1MmJiZjc2OSIsImlhdCI6MTcwMDcxNjEzN30.0LaP2Gmv_JvJVmEZkY8fnEnCNGdDYjB4SqztNz6LslQ"
console.log("token",token);
if(!token){
    return next(errorhandler(401,'unauthorised'))
}else{
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
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