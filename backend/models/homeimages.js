const mongoose= require('mongoose');
const homeimagesSchema = new mongoose.Schema(
    {
        content:[
            {
                type:String,
                
            }
        ]
    }
   )

module.exports=mongoose.model('Homeimage',homeimagesSchema);