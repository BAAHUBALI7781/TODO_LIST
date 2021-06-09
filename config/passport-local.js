const passport=require('passport');
const passportLocal=require('passport-local').Strategy;
const User=require('../model/user');

passport.use(new passportLocal({
    usernameField:'email',
    passReqToCallback:true
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error");
            return done(err);
        }
        else if(!user || password!=user.password){
            console.log('Invalid Username/Password');
            return done(null,false);
        }
        else
        {
            return done(null,user);
        }
    });
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error',err);
            return done(err);
        }
        return done(null,user);
    });
});
passport.checkAuthetication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
        res.redirect('/user/sign-up-page');
};

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated())
    {
        req.locals.user=req.user;
    }
    next();
}
module.exports=passport;