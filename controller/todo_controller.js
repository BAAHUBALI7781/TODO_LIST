const TodoList = require("../model/todo");

//Controller for adding a Todo
module.exports.addTodo=function(req,res){
    var x=req.body.category;
    if(req.body.category=="Choose a Category")
        x='';
    TodoList.create({
        description:req.body.description,
        category:x,
        date:req.body.date,
    },function(err,newTodo){
        if(err){
            console.log('Error while creating new Todo');
            alert('Description and Date are required!');
            return res.redirect('/');
        }
        else
        {
            return res.redirect('/');
        }
    })
   
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
