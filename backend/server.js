const express = require('express');
const app = express();

app.listen(3000,(err)=>{
    console.log('server running');

    if(err){
        console.log(err);
    }
})