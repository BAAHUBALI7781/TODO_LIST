const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:"list.tododo@gmail.com",
        pass:process.env.pass || "this is real"
    }
});

let renderTemplate=function(data,relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in sending mail");
                return;
            }
            else{
                mailHTML=template;
            }
        }
    )
    return mailHTML;
    
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}