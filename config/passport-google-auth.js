const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../model/user');

passport.use(new googleStrategy({
    clientID:'681834863017-5l17jeepjg0olj059e61ngmh4fbd8jse.apps.googleusercontent.com',
    clientSecret:'Xwiopgs2eKj084tqn2Y2IkVd',
    callbackURL: process.env.CALL_BACK_URL || 'http://localhost:8020/user/auth/google/callback'
    },function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error occured on login");
                return;
            }
            if(user){
                done(null,user);
            }
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error",err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }));

    module.exports=passport;