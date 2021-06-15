const TodoList = require("../model/todo");

//Controller for adding a Todo
module.exports.addTodo=async function(req,res){
    try{
        var x=req.body.category;
        if(req.body.category=="Choose a Category")
            x='';
        let newTodo=await TodoList.create({
            description:req.body.description,
            category:x,
            date:req.body.date,
            user:req.user
        });
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
        console.log("Error");
        return ;
    }
    

   
};

//Controller for deleting a Todo

module.exports.deleteTodo=function(req,res){
    var x=req.body.check;
    if((typeof x)=="undefined")
    {
        return res.redirect('/');
    }
    else if((typeof x)=="string")
    {
        TodoList.findByIdAndDelete(x,function(err){
            if(err){
                console.log('Error in deletion');
                return;
            }
            res.redirect('/');
        })
    }
    else
    {
        for(var i=0;i<x.length;i++)
        {
            TodoList.findByIdAndDelete(x[i],function(err){
                if(err){
                    console.log('Error in deletion');
                    return;
                }
                
            });
              
        
        }
        res.redirect('back'); 
      
    }
    
}
