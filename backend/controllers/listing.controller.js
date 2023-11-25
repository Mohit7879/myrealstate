const Listing=require('../models/listing.model.js');
const { errorhandler } = require('../utils/error.js');
module.exports.createListing=async (req,res,next)=>{
      let data=req.body.formData
        
         console.log(req.body);
    try {

        const listing = await Listing.create(req.body);
        return  res.status(200).json(listing);
        

        
    } catch (error) {
        next(error)
        
    }

}

 module.exports.deleteList =async (req,res, next)=>{
    try {
     console.log(req.params.id);

      const listing=await Listing.findById(req.params.id)
      console.log(listing);

      if(!listing){
        return next(errorhandler(401,'listing not found'));
      }


    //   if(req.user.id!==Listing.userRef){
    //     return next(errorhandler(401,'you can delete your own listing'));
    // }

    await Listing.findByIdAndDelete(req.params.id)
    console.log('deleted');
         return res.status(200).json(listing)
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}