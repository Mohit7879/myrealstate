const { test1, updateUser, deleteUser, getuserlisting } = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');
const router=require('express').Router();

router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/getlisting/:id',verifyToken, getuserlisting);
module.exports=router;