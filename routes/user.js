const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controller/user_controller');
const User = require('../model/user');
router.get('/sign-up-page',userController.sign_up_page);
router.get('/sign-in-page',userController.sign_in_page);
router.post('/sign-up',userController.sign_up);
router.post('/sign-in',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in-page'}
),userController.sign_in);
router.get('/logout',userController.logout);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'user/sign-in-page'}),userController.sign_in);
module.exports=router;