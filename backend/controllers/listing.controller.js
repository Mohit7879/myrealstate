
const Listing=require('../models/listing.model.js');
const { errorhandler } = require('../utils/error.js');
module.exports.createListing=async (req,res,next)=>{
      let data=req.body.formData
        
       
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
    
      if(!listing){
        return next(errorhandler(401,'listing not found'));
      }


    

    await Listing.findByIdAndDelete(req.params.id)
   
         return res.status(200).json(listing)
    } catch (error) {
       
        next(error)
        
    }
}

module.exports.getListing=async (req,res,next)=>{

    try {
      
     const getlisting=await Listing.findById(req.params.listingid)
        
        if(!getlisting){
          return next(errorhandler(401,'listing not found'));
        }

        return res.status(200).json(getlisting);
  
        
    } catch (error) {

        next(error)
        
    }
}


module.exports.searchListings=async (req,res,next)=>{
        
    console.log(req.query,"query");
    try{
       
    const limit=parseInt(req.query.limit)||9;
    const startIndex=parseInt(req.query.startIndex)||0;
    let offer=req.query.offer;

    if(offer===undefined||offer==='false'){
        offer={$in:[true,false]}
    }
   
    let furnished=req.query.furnished;

    if(furnished===undefined||furnished==='false'){

        furnished = { $in:[false,true]};
    }

    console.log(furnished);
         
    let parking=req.query.parking;

    if(parking===undefined||parking==='false'){

        parking = { $in:[false,true]};
    }

   

    let type=req.query.type;

    if(type===undefined|| type==='all'){

        type={$in:['rent','sale']};
    }

   

    const searchTerm=req.query.searchTerm||'';

    const sort = req.query.sort||'createdAt';

    const order = req.query.order || 'desc';
 
    const listings = await Listing.find({

        name:{$regex : searchTerm , $options:'i'},
        offer,
        furnished,
        parking,
        type,
    }).sort({
        [sort]:order
    }).limit(limit).skip(startIndex);
    console.log(listings);
    return res.status(200).json(listings);
  



    
        
    } catch (error) {
        next(error)
        
    }

}