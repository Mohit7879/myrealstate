const { createListing, deleteList,getListing, searchListings } = require('../controllers/listing.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');

const router=require('express').Router();

router.post('/create',verifyToken,createListing)
router.delete('/deletelist/:id',verifyToken,deleteList)
router.get('/getlisting/:listingid',verifyToken,getListing)
router.get('/get',verifyToken,searchListings)

module.exports=router;