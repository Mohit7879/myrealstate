const express = require('express');
const app = express();
const mongoose =require('mongoose');
const path = require('path')
const cookieparser = require('cookie-parser');


require('dotenv').config();


mongoose.connect(process.env.MONGO)
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})



app.use(cookieparser());

// insert by default


 const dirname=path.resolve();
  



app.listen(3000,(err)=>{
    console.log('server running');

    if(err){
        console.log(err);
    }
})


app.use(express.urlencoded({
    extended:true,
}));

app.use(express.json())

app.use(require('./routes/index'));


app.use(express.static(path.join(dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(dirname,'client','dist','index.html'))
})


//This middleware is used to handle errors that occur in your application. 
//When an error is encountered in a route or a previous middleware,
// it can be passed to this middleware using next(err), 
//and it will respond with the appropriate error status and message in a consistent JSON format.
//next (a function to pass control to the next middleware).



app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Interval Server Error';
    console.log(message);
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
