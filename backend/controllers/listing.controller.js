const Listing=require('../models/listing.model.js')
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