const express = require('express');
const app = express();
const mongoose =require('mongoose');
const cookieparser = require('cookie-parser');

const dotenv=require('dotenv');
dotenv.config();

mongoose.connect("mongodb+srv://mohityadav:kJUgEFqwrto0XUYW@realestatec.fupwuxe.mongodb.net/realestate?retryWrites=true&w=majority")
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})

app.use(cookieparser());


   



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
