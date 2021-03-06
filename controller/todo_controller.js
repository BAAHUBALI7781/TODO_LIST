const TodoList = require("../model/todo");
const todo_mailer=require('../mailer/todo_mailer');

//Controller for adding a Todo
module.exports.addTodo=async function(req,res){
    try{
        console.log(req.body);
        var x=req.body.category;
        if(req.body.category=="Choose a Category")
            x='';
        let newTodo=await TodoList.create({
            description:req.body.description,
            category:x,
            date:req.body.date,
            time:req.body.time,
            user:req.user
        });
        newTodo=await newTodo.populate('user','name email').execPopulate();

        todo_mailer.sendMail(newTodo);
        todo_mailer.scheduleMail(newTodo);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    todo:newTodo
                },
                message:'Added Todo'
            });
        }
        return res.redirect('/');
    }catch(err){
        console.log("Error in adding todo");
        return ;
    }
    

   
};

//Controller for deleting a Todo

module.exports.deleteTodo=function(req,res){
    var x=req.body.check;
    if((typeof x)=="undefined")
    {
        return;
    }
    else if((typeof x)=="string")
    {
        TodoList.findByIdAndDelete(x,function(err){
            if(err){
                console.log('Error in deletion');
                return;
            }
        })
    }
    else
    {
        for(var i=0;i<x.length;i++)
        {
            TodoList.findByIdAndDelete(x[i],function(err){
                if(err){
                    console.log('Error in deletion');
                }
                
            });
              
        
        }
      
    }
    if(req.xhr){
        res.status(200).json({
            data:{
                todoId:req.body.check
            },
            message:'Deleted successfully'
        })
    }
    
}
