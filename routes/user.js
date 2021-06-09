const express=require('express');
const router=express.Router();

const userController=require('../controller/user_controller');
router.get('/sign-up-page',userController.sign_up_page);

module.exports=router;