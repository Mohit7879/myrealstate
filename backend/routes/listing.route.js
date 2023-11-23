const { createListing } = require('../controllers/listing.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');

const router=require('express').Router();

router.post('/create',createListing)

module.exports=router;