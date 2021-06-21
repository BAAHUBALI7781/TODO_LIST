const TodoList = require("../model/todo");

//Showing the TodoList
module.exports.home=async function(req,res){
    try{
        if(req.user){
            let todoList=await TodoList.find({user:req.user})
            .sort('date')
    
            return res.render('home',{
                title:'Todo List',
                todo_list:todoList,
            });
        
        }
        else
        {
            res.redirect('/user/sign-in-page')
        }
    }catch(err){
        console.log("Error occured in homepage!",err);
        return;
    }
    
}