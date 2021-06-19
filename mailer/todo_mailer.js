const nodemailer=require('../config/nodemailer');

exports.sendMail=function(todo){
    let html=nodemailer.renderTemplate({todo:todo},'./todo.ejs')
    nodemailer.transporter.sendMail({
        from:'list.tododo@gmail.com',
        to:todo.user.email,
        subject:'Task Added!',
        html:html
    },function(err,info){
        if(err){
            console.log("Error in sending mail");
            return;
        }
        else{
            console.log("Mail sent ", info);
            return;
        }
    })
}