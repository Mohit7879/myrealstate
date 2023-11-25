const { createListing, deleteList } = require('../controllers/listing.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');

const router=require('express').Router();

router.post('/create',verifyToken,createListing)
router.delete('/deletelist/:id',verifyToken,deleteList)

module.exports=router;