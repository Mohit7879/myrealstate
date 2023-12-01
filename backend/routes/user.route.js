const { test1, updateUser, deleteUser, getuserlisting } = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyToken.js');
const router=require('express').Router();

router.post('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.get('/getlisting/:id', getuserlisting);
module.exports=router;