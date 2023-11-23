const { signup, signin, signOut } = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/verifyToken');

const router=require('express').Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signOut);

module.exports=router;