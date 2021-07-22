const User=require('../model/user');
module.exports.sign_up_page=function(req,res){
    return res.render('signup',{
        title:'DoTodo signup page'
    })
}
module.exports.sign_in_page=function(req,res){
    return res.render('signin',{
        title:'DoTodo signin page'
    })
}
module.exports.sign_up=function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user');
            return res.redirect('back');
        }
        else{
            if(user){
                console.log('User Already exists!');
                return res.redirect('sign-in-page');
            }
            else
            {
                if(req.body.password!=req.body.confirm_password){
                    console.log("Passwords are not same, try again");
                    return res.redirect('back');
                }
                else
                {
                    User.create(req.body,function(err,newUser){
                        if(err){
                            console.log("Error in creatng account");
                            return res.redirect('back');
                        }
                        else
                        {
                            console.log("Account created");
                            return res.redirect('sign-in-page')
                        }
                    })
                }
            }
        }

    })
}
module.exports.sign_in=function(req,res){
    console.log("Logged in successfully");
    return res.redirect('/');
}
module.exports.logout=function(req,res){
    req.logout();
    console.log("Successfully logout");
    return res.redirect('/');
}