const TodoList = require("../model/todo");

//Showing the TodoList
module.exports.home=function(req,res){
    TodoList.find({},function(err,todoList){
        if(err)
        {
            console.log('Error while displaying');
            return;
        }
        else
        {
            return res.render('home',{
                title:'Todo List',
                todo_list:todoList,
            });

        }
    })
}