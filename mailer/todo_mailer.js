const nodemailer=require('../config/nodemailer');
const Schedule=require('node-schedule');

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
exports.scheduleMail=function(todo){
    var date=new Date(todo.date);
    var prev=new Date(date);

    prev.setDate(prev.getDate()-1);
    
    var time=todo.time;
    var hour=time.substr(0,2);
    var min=time.substr(3,2);
    console.log("time ",hour, min);
    var onDate=new Date(prev.getFullYear(), prev.getMonth(), prev.getDate(), hour, min);
    onDate.setHours(onDate.getHours() + 5);
    onDate.setMinutes(onDate.getMinutes() + 30);
    console.log(onDate);
    Schedule.scheduleJob(onDate,function(){
        let html=nodemailer.renderTemplate({todo:todo},'./scheduleTodo.ejs')
        nodemailer.transporter.sendMail({
            from:'list.tododo@gmail.com',
            to:todo.user.email,
            subject:'Task Reminder!',
            html:html
        },function(err,info){
            if(err){
                console.log("Error in sending mail");
                return;
            }
            else{
                console.log("Mail will be sent on ", onDate);
                return;
            }
        })
    })
}
