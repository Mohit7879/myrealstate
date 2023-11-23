const { test1, updateUser, deleteUser } = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');
const router=require('express').Router();

router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
//router.get('/test1',test1);
module.exports=router;