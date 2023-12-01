const { createListing, deleteList,getListing, searchListings } = require('../controllers/listing.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');

const router=require('express').Router();

router.post('/create',createListing)
router.delete('/deletelist/:id',deleteList)
router.get('/getlisting/:listingid',getListing)
router.get('/get',searchListings)

module.exports=router;