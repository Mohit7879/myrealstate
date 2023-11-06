const express = require('express');
const app = express();
const mongoose =require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect("mongodb+srv://mohityadav:kJUgEFqwrto0XUYW@realestatec.fupwuxe.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
    console.log("App is now connected to DB")
}).catch((err)=> {
    console.log(`${err}`);
})

   



app.listen(3000,(err)=>{
    console.log('server running');

    if(err){
        console.log(err);
    }
})