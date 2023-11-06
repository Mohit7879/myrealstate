const { test, test1 } = require('../controllers/user.controller.js');
const router=require('express').Router();

router.get('/test',test);
router.get('/test1',test1);
module.exports=router;